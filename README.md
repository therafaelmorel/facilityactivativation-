# Facility Activation UI Demo

Role-based desktop demo for the hospital facility activation platform. The visual system uses white, hospital red, Inter, and no hospital logo.

## Role demos

- **Project team:** a workload dashboard with assigned projects, assigned tasks, overdue work, issues, a work calendar, priority tasks, project readiness, recent activity, status updates, notes, blockers, and evidence. Users cannot edit or delete task definitions.
- **Administrator:** project control, project setup, task library, assignments, users and departments, and activity history.
- **Leadership:** read-only portfolio readiness, project health, critical risks, and blocker drill-downs.

Choose a role on the opening screen or use the persistent role control at the top of the application. The navigation, identity, homepage, and permissions update immediately. Role switching and sidebar navigation stay inside the same file and do not reload the preview.

Run `npm install` and `npm run dev`, then select a role and use that role’s sidebar to move through its available screens.

All data is illustrative but grounded in the analyzed Building Activation workbook.
