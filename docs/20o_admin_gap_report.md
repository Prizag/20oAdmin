# 20o.in Admin System Gap Report

This report compares the current codebase implementation against the extracted `20o_ecommerce_admin_vendor_panel_spec.docx` specification.

## 1. Completed Items
- Scaffolding of basic routing for all 4 panels (`/admin`, `/vendor`, `/china`, `/hub`).
- Extracted DOCX to Markdown successfully (`docs/20o_admin_spec_extracted.md`).
- Next.js 14 setup with Tailwind CSS, Lucide React, and Recharts.

## 2. Partially Completed Items
- **Roles & Permissions (`/admin/roles`)**: Basic table exists but only displays 2 demo roles. Missing the 13 required roles, permission matrix, and role detail drawer.
- **Admin Layout (`/admin/layout.tsx`)**: Static sidebar exists, but does not support role-based rendering (e.g. hiding modules based on role).
- **Products (`/admin/products`)**: Table exists, but lacks advanced filters, strict compliance warning labels as per doc, and tabbed view (`/admin/products/[id]`) needs all 9 tabs defined in the spec.
- **China Feed Updates (`/admin/feed-updates`)**: Basic compare table exists, but needs proper mock data reflecting exact spec fields.
- **Orders (`/admin/orders`)**: Parent/sub-order split basic mock exists, but customer-facing vs internal status mapping lacks the full spec definitions.
- **Hub & China Panels**: Basic tables exist but are missing strict data-privacy views, full workflow action buttons (availability check, actual cost update, QC).

## 3. Missing Items (To be created)
- **All 13 Roles Seed Data**: (Super Admin, Admin Manager, Product Manager, Order Manager, China Ops, Hub, Vendor Manager, Finance, CS, Marketing, Compliance, Read-only Auditor, Indian Vendor).
- **Permission Matrix**: View, Create, Edit, Delete, Approve, Export, Sensitive View, Sensitive Edit across all modules.
- **Role-based Sidebar Logic**: dynamic sidebar filtering based on the logged-in user's role.
- **Vendor Specific Workflows**: CSV import UI with mapping, stock management, return policy.
- **Pricing Engine Config**: Formula builder, landed cost components, minimum margin guard.
- **Exchange Rate Tracker**: 3-day average logic mock, manual override with reason.
- **Logistics Courier Assignment**: Delhivery/BlueDart badges, auto-assignment rule mock, manual override with reason.
- **Finance Reports**: GST, TCS/TDS, Vendor Settlement, Tally/Zoho export buttons.

## 4. Next Steps for Implementation
1. **Fix Roles & Permissions (`/admin/roles`)**: Implement the 13 roles and permission matrix.
2. **Implement Role-Based Sidebar**: Refactor `src/app/admin/layout.tsx`.
3. **Enhance Detail Pages**: Add the specified detail tabs and mock data to Orders, Products, Vendors.
4. **Update Vendor Panel**: Ensure vendor panel has CSV import UI and specific workflows.
