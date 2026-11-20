import { useState } from "react";

type ViewMode = "side-by-side" | "without" | "with" | "golden-master";

interface Section {
	label: string;
	without: string;
	with: string;
}

const GOLDEN_MASTER = {
	feature: "Team Role Permissions",
	sections: [
		{
			label: "Problem Statement",
			content:
				'Workspace admins (n=1,200 across 84 orgs) currently use a binary Owner/Member model. 43% of admins surveyed (Q3 2025) reported creating workaround "service accounts" to approximate granular permissions, increasing their seat costs by an average of 15%. There is no way to grant scoped access (e.g., billing-only, project-scoped edit) without granting full Owner privileges, which violates the principle of least privilege and creates audit concerns for SOC 2-certified customers.',
		},
		{
			label: "Acceptance Criteria",
			content:
				'- Admins can create custom roles with any combination of 24 discrete permissions grouped into 6 categories (billing, members, projects, integrations, security, content)\n- Role changes propagate to active sessions within 60 seconds; affected users see an inline banner "Your permissions were updated" on their next navigation\n- Built-in roles (Owner, Editor, Viewer) cannot be deleted but can be cloned and modified\n- A role diff view shows exactly which permissions changed before an admin confirms an edit\n- Removing a permission that would orphan resources (e.g., last user with "manage billing") is blocked with an explanation\n- All permission changes emit an audit log event with actor, target user, before/after role, and timestamp (queryable via API within 5 minutes)',
		},
		{
			label: "Edge Cases",
			content:
				'- Admin downgrades their own role: confirm dialog warns "You will lose access to this settings page" and requires a second admin to be present on the account\n- User belongs to multiple teams with conflicting roles: most-permissive wins at the resource level, with a tooltip showing which role grants access\n- SSO/SCIM-provisioned users: role assignment via SCIM group mapping takes precedence over manual assignment; manual overrides show a "Managed by SSO" badge\n- Mid-session permission revocation while user has unsaved work: save is allowed, subsequent edits are blocked with a toast explaining the change\n- Role with zero permissions assigned: creation is allowed (for staging), but assigning it to a user triggers a warning that they will have read-only access to nothing',
		},
		{
			label: "Dependencies",
			content:
				"- Auth service v4 permission model (team: Identity, shipped in v4.1.0)\n- SCIM group-to-role mapping endpoint (team: Identity, ETA: April 5)\n- Audit log v2 with structured event payloads (team: Platform, shipped in v3.8.0)\n- Admin UI component library: role-picker, permission-matrix, and diff-viewer components needed from Design Systems by March 20\n- Documentation: updated RBAC guide for help center before public launch",
		},
	],
};

const SECTIONS: Section[] = [
	{
		label: "Problem Statement",
		without: "Users need to manage their notification preferences. Currently there is no way to control what notifications they receive.",
		with: "Users on the Pro and Enterprise tiers receive an average of 12 notifications per day, and 68% of survey respondents (n=340, Q4 2025) rated notification overload as a top-3 frustration. There is no self-service way to mute, batch, or channel-route notifications, so users either ignore all of them (reducing engagement) or create email filters outside the product (fragmenting their workflow).",
	},
	{
		label: "Acceptance Criteria",
		without: "- Users can update their notification settings\n- Changes should be saved\n- The UI should be intuitive",
		with: '- Users can toggle each notification category (mentions, assignments, status changes, comments, digest) independently\n- Changes persist within 200ms and show an inline "Saved" confirmation; no full-page reload\n- Preferences sync across web, mobile, and email channels within 30 seconds\n- Users can set "quiet hours" (start/end in their local timezone) during which non-critical notifications are batched\n- A "Reset to defaults" action restores the onboarding-time settings with a confirmation dialog\n- Screen readers can navigate every toggle and announce its current state (WCAG 2.1 AA)',
	},
	{
		label: "Edge Cases",
		without: "- What if the save fails?\n- What about mobile users?\n- Consider different user roles",
		with: '- Save fails mid-batch: roll back the entire changeset, surface a toast with "Retry" action, and log the failed payload for support debugging\n- User belongs to an org with admin-enforced notification policies: locked toggles show a tooltip "Managed by your organization" with a link to the admin\n- Timezone changes (travel, DST): quiet-hours window recalculates on next server tick; if a user changes timezone in their profile, pending batched notifications flush immediately\n- User has zero notification channels enabled: block the final toggle-off with an inline warning explaining that at least one channel must be active for security alerts\n- Concurrent edits from web + mobile before sync completes: last-write-wins with a subtle "Updated on another device" indicator on the stale client',
	},
	{
		label: "Dependencies",
		without: "- Backend API\n- Database changes\n- Frontend components",
		with: '- Notification Service v2 API (team: Platform, ETA: March 15) — the new /preferences endpoint must be live before FE work starts\n- User timezone stored in profile service (already shipped in v3.2.1)\n- Shared toggle component from the design system — current version lacks "managed/locked" state; need DS team to ship variant by March 10\n- Mobile SDK push-token refresh — if the user disables then re-enables push, the SDK must re-register; requires iOS 2.8.0+ and Android 4.5.0+\n- Analytics: new Segment events notification_pref_changed and quiet_hours_set must be defined in the tracking plan before QA',
	},
];

function SectionCard({ section, variant }: { section: Section; variant: "without" | "with" }) {
	const content = variant === "without" ? section.without : section.with;

	return (
		<div className={`border rounded-lg px-4 py-3 ${variant === "without" ? "border-stone-200 bg-stone-50/50" : "border-violet-200 bg-violet-50/30"}`}>
			<div className={`text-xs font-semibold mb-2 ${variant === "without" ? "text-stone-500" : "text-violet-600"}`}>{section.label}</div>
			<div className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap">{content}</div>
		</div>
	);
}

export function GoldenMasterComparison() {
	const [view, setView] = useState<ViewMode>("side-by-side");

	const viewOptions: { value: ViewMode; label: string }[] = [
		{ value: "golden-master", label: "Golden master" },
		{ value: "side-by-side", label: "Side by side" },
		{ value: "without", label: "Without" },
		{ value: "with", label: "With" },
	];

	return (
		<div className="my-10">
			<div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
				{/* Header */}
				<div className="bg-stone-50 border-b border-stone-200 px-5 py-3">
					<div className="flex items-center justify-between mb-2">
						<div>
							<div className="text-sm font-semibold text-stone-800">Golden Master Comparison</div>
							<div className="text-xs text-stone-500 mt-0.5">Feature: User Notification Preferences</div>
						</div>
					</div>
					<div className="flex gap-1.5 flex-wrap">
						{viewOptions.map((opt) => (
							<button
								key={opt.value}
								type="button"
								onClick={() => setView(opt.value)}
								className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
									view === opt.value
										? opt.value === "golden-master"
											? "bg-teal-100 text-teal-700 border border-teal-300"
											: "bg-violet-100 text-violet-700 border border-violet-300"
										: "bg-stone-100 text-stone-500 border border-stone-200 hover:bg-stone-150"
								}`}
							>
								{opt.label}
							</button>
						))}
					</div>
				</div>

				<div className="px-5 py-4">
					{view === "golden-master" ? (
						<div>
							<div className="text-xs text-stone-500 mb-3">
								This is the completed example we gave the AI alongside the template. It's for a different feature ({GOLDEN_MASTER.feature}) — the AI picks up on
								the <strong className="text-stone-700">depth, specificity, and style</strong>, not the content.
							</div>
							<div className="space-y-2">
								{GOLDEN_MASTER.sections.map((s) => (
									<div key={s.label} className="border border-teal-200 bg-teal-50/30 rounded-lg px-4 py-3">
										<div className="text-xs font-semibold text-teal-600 mb-1">{s.label}</div>
										<div className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap">{s.content}</div>
									</div>
								))}
							</div>
						</div>
					) : view === "side-by-side" ? (
						<div className="space-y-4">
							{SECTIONS.map((section) => (
								<div key={section.label}>
									<div className="text-xs font-semibold text-stone-700 mb-2">{section.label}</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										<div>
											<div className="text-xs text-stone-400 mb-1">Template only</div>
											<SectionCard section={section} variant="without" />
										</div>
										<div>
											<div className="text-xs text-violet-500 mb-1">Template + golden master</div>
											<SectionCard section={section} variant="with" />
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="space-y-3">
							<div className="text-xs text-stone-400 mb-2">
								{view === "without"
									? "Generated with template only — structurally correct, but generic and vague."
									: "Generated with template + golden master — specific, testable, and thorough."}
							</div>
							{SECTIONS.map((section) => (
								<SectionCard key={section.label} section={section} variant={view} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
