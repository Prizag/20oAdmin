**20o.in Ecommerce Portal**

**Detailed Admin Panel, Vendor Panel, China Team Panel & Transit Hub Panel Specification**

Developer Handover Document | MERN Stack | Desktop Admin | Marketplace + Direct Import Operations

Version: 1.0 | Prepared for: 20o.in | Prepared date: 11 June 2026

Confidential: For internal product, operations, compliance and development teams only.

<table><tbody><tr><td><p><strong>Area</strong></p></td><td><p><strong>Confirmed Direction</strong></p></td></tr><tr><td><p>Business model</p></td><td><p>Marketplace-style platform; customer-facing seller/invoice handled by 20o.in/Indian importer brand; Indian vendors act as supplier/manufacturer partners.</p></td></tr><tr><td><p>China model</p></td><td><p>China Product Feed items are listed on website; after prepaid customer order, China staff manually buys, consolidates, repacks/bundles and sends to India hub.</p></td></tr><tr><td><p>Indian model</p></td><td><p>Indian manufacturer vendors self-register, upload/import products, receive orders, and 20o.in arranges pickup and local delivery. COD allowed only for Indian vendor products.</p></td></tr><tr><td><p>Warehouse model</p></td><td><p>No long-term inventory storage. China shipments pass through a transit warehouse/hub for same-day/next-morning QC, splitting, repacking and local courier dispatch.</p></td></tr><tr><td><p>Technology</p></td><td><p>MERN stack, web-only, desktop admin, DigitalOcean Spaces for media, daily product feed sync, background jobs and queue processing.</p></td></tr><tr><td><p>Prioritization</p></td><td><p>Each module is marked Must Have, Good to Have or Future.</p></td></tr></tbody></table>

Important legal note: This document is a technical/admin-panel specification, not legal advice. Final compliance around imports, customs, product category restrictions, GST/TCS/TDS, invoice format, DPDP handling and consumer disclosures should be reviewed by a qualified legal/tax/customs advisor before launch.

# Table of Contents

1.  1\. Document Purpose and Product Vision
2.  2\. Confirmed Scope and Operating Assumptions
3.  3\. Feature Priority Legend
4.  4\. User Roles and Permission Model
5.  5\. End-to-End Business Workflows
6.  6\. Admin Panel Specification
7.  7\. Vendor Panel Specification
8.  8\. China Team Panel Specification
9.  9\. Transit Warehouse/Hub Panel Specification
10.  10\. Product, Pricing and Compliance Architecture
11.  11\. Order, Cancellation, Return, Refund and Wallet Architecture
12.  12\. Logistics and Shipment Architecture
13.  13\. Finance, Tax, Invoice and Export Architecture
14.  14\. Reports and Analytics
15.  15\. Notifications and Communication
16.  16\. Security, Privacy, Audit Logs and KYC Data Handling
17.  17\. Suggested MERN Architecture
18.  18\. Suggested Database Entities
19.  19\. API Endpoint Map
20.  20\. Phase-wise Delivery Plan
21.  21\. Acceptance Criteria and QA Checklist
22.  22\. Compliance References for Developer Awareness

# 1\. Document Purpose and Product Vision

This document defines the complete admin-side and vendor-side system required for 20o.in, an ecommerce portal that sells products from two parallel supply sources: a China Product Feed and Indian manufacturer vendors. The goal is to provide the developer with a clear blueprint for modules, roles, workflows, statuses, data structures, settings, approvals, operational exceptions and reports.

The product promise is direct-from-manufacturer ecommerce. For China products, items are listed through the China Product Feed; after the customer places a prepaid order, the internal China team buys, consolidates, repacks, quality-checks and ships the goods to India. For Indian products, vendors are preferably manufacturers who manage their own catalog and stock while 20o.in controls platform approval, customer support, pickup, delivery and customer experience.

*   The platform must support both China imports and Indian vendor products in the same storefront and cart.
*   The admin panel must be highly operational, not just catalog management. It should manage pricing, approvals, China purchase tasks, transit hub operations, courier assignment, returns, refunds, vendors, subscription, KYC, wallet, invoices, taxes, reports and audit logs.
*   The vendor panel must be simple enough for manufacturers while still supporting product CSV imports, inventory, order processing, return policy management, subscription, rating, settlement/payout reports and support.
*   The China team and transit warehouse/hub users are internal employees with restricted work-specific views, not external vendors.
*   The platform is MERN stack, web-only at launch, and admin is desktop-only.

# 2\. Confirmed Scope and Operating Assumptions

<table><tbody><tr><td><p><strong>Topic</strong></p></td><td><p><strong>Confirmed Specification</strong></p></td></tr><tr><td><p>Brand/domain</p></td><td><p>20o.in</p></td></tr><tr><td><p>Operating model</p></td><td><p>Marketplace-style system, but customer-facing invoice/seller is 20o.in/Indian importer brand. Vendors are supplier/manufacturer partners.</p></td></tr><tr><td><p>Supply source 1</p></td><td><p>China Product Feed. Product data is inserted/synced automatically by developer-side feed logic. Admin does not need API setup UI in this document.</p></td></tr><tr><td><p>Supply source 2</p></td><td><p>Indian manufacturer vendors. Vendors self-register and can upload/import products. Admin approves vendors and products.</p></td></tr><tr><td><p>China ordering</p></td><td><p>Manual by China internal team after customer prepaid order. China team must not see customer identity unless explicitly required later.</p></td></tr><tr><td><p>India hub</p></td><td><p>Transit warehouse/hub, no long-term inventory storage. Received China parcels are shipped same day or next morning.</p></td></tr><tr><td><p>Prepaid/COD</p></td><td><p>China products prepaid only. Indian vendor products can support COD, prepaid, pay later/BNPL.</p></td></tr><tr><td><p>KYC</p></td><td><p>Customer can skip KYC and pay higher shipping/import option. If they choose cheaper shipping/import option, KYC can be initiated before payment and actual upload may happen later. Full document image/PDF is stored until account deletion.</p></td></tr><tr><td><p>Delivery estimate</p></td><td><p>Dynamic delivery range by source, product, weight, pincode/location and courier SLA.</p></td></tr><tr><td><p>Product categories</p></td><td><p>Women fashion, men fashion, kitchen appliances, stationery, women accessories and similar lightweight categories. Heavy items may be allowed from Indian vendors.</p></td></tr><tr><td><p>Compliance</p></td><td><p>BIS-required/high-compliance China products should preferably be avoided. System shows warnings; it does not auto-unpublish unless admin manually configures a category-specific rule later.</p></td></tr><tr><td><p>Product source label</p></td><td><p>Customer-visible labels such as Direct from China Manufacturer, Made in India, Direct Indian Manufacturer, country of origin, and delivery estimate.</p></td></tr><tr><td><p>Returns</p></td><td><p>China: damaged/wrong item only, returnless refund possible. India: vendor-specific return policy. Platform handles CS and local delivery coordination.</p></td></tr><tr><td><p>Refund</p></td><td><p>Default wallet refund. Customer can request bank/source refund through CS; admin may deduct fee.</p></td></tr><tr><td><p>Payment</p></td><td><p>Gateway-agnostic module; BNPL/pay-later planned for China and Indian products.</p></td></tr><tr><td><p>Storage</p></td><td><p>DigitalOcean Spaces. External images must be downloaded, compressed, thumbnailed and served from Spaces.</p></td></tr><tr><td><p>Sync</p></td><td><p>Daily feed sync; price history stored, images history not stored. Manual product overwrites protected; new feed updates shown for admin approval.</p></td></tr><tr><td><p>Accounting</p></td><td><p>CSV export compatible with Tally/Zoho in Phase 1.</p></td></tr><tr><td><p>Support</p></td><td><p>Platform team only; vendors do not directly handle customer support.</p></td></tr></tbody></table>

## 2.1 Out of Scope for Phase 1

*   Mobile app. The initial platform is web-only.
*   Mobile-friendly admin. Admin is desktop-only.
*   Long-term inventory warehouse management. The India hub is a transit and sorting point only.
*   Direct API import from Amazon/Flipkart/Shopify for vendors. Vendor imports will be CSV-based with manual column mapping.
*   Customer-visible consent checkbox specifically for China import, as per current business decision.
*   Automatic unpublishing of compliance-risk products unless admin manually changes product/category status.
*   Direct Tally/Zoho Books integration. Phase 1 export is CSV-compatible.

# 3\. Feature Priority Legend

<table><tbody><tr><td><p><strong>Priority</strong></p></td><td><p><strong>Meaning</strong></p></td><td><p><strong>Developer Treatment</strong></p></td></tr><tr><td><p>Must Have</p></td><td><p>Required for launch or core operations.</p></td><td><p>Design database and UI from day one. Do not treat as optional.</p></td></tr><tr><td><p>Good to Have</p></td><td><p>Strongly useful, but can be delayed if launch timeline is tight.</p></td><td><p>Prepare architecture hooks if possible.</p></td></tr><tr><td><p>Future</p></td><td><p>Advanced feature that can be released after stable operations.</p></td><td><p>Avoid blocking core architecture; define placeholders/settings where needed.</p></td></tr></tbody></table>

# 4\. User Roles and Permission Model

The system must use role-based access control. Every admin or internal employee action must be permission-controlled and audit-logged. Admin should be able to create additional admin users and assign roles/permissions. Sensitive information such as customer KYC and vendor bank details must be restricted by default.

<table><tbody><tr><td><p><strong>Role</strong></p></td><td><p><strong>Access Scope</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Super Admin</p></td><td><p>Full system access, create roles, approve sensitive actions, global settings, payment/logistics integrations, compliance settings, exports.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Admin Manager</p></td><td><p>General operational access except role creation, sensitive KYC, bank details and high-value refund approvals unless permitted.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Product Manager</p></td><td><p>Manage categories, product approvals, feed products, overrides, pricing, compliance warnings, SEO, media.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Order Manager</p></td><td><p>Manage orders, split orders, cancellation windows, China/internal task status, courier assignment, exceptions.</p></td><td><p>Must Have</p></td></tr><tr><td><p>China Operations User</p></td><td><p>Internal employee. View China purchase queue and product sourcing data only; no customer identity. Update purchase, QC and international shipment steps.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Transit Warehouse/Hub User</p></td><td><p>Internal employee. Receive China parcels, scan, QC, split, pack, assign/print local labels, handover courier.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Vendor Manager</p></td><td><p>Vendor onboarding, KYC review, account manager assignment, vendor products approval, vendor rating moderation, subscription extension.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Finance Manager</p></td><td><p>Invoices, GST reports, vendor settlements, wallet/refund reports, TCS/TDS reports, CSV export, subscription invoices.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Customer Support Agent</p></td><td><p>View customer orders, tickets, refund requests, complaints, returnless refund flows, internal notes. Cannot see full KYC unless permitted.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Marketing/CMS Manager</p></td><td><p>Home banners, collections, coupons, campaigns, SEO blocks, landing pages, notifications.</p></td><td><p>Good to Have</p></td></tr><tr><td><p>Compliance Officer</p></td><td><p>Review compliance warnings, restricted categories, legal metrology missing fields, category risks, product blocks.</p></td><td><p>Good to Have</p></td></tr><tr><td><p>Read-only Auditor</p></td><td><p>View audit logs, reports and exports without edit/delete permissions.</p></td><td><p>Good to Have</p></td></tr><tr><td><p>Indian Vendor</p></td><td><p>External vendor/manufacturer login; manage own profile, catalog, stock, orders, CSV imports, return policy, reports and support.</p></td><td><p>Must Have</p></td></tr></tbody></table>

## 4.1 Permission Matrix

<table><tbody><tr><td><p><strong>Permission</strong></p></td><td><p><strong>Allowed Role(s)</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Create admin users</p></td><td><p>Super Admin</p></td><td><p>Must Have</p></td></tr><tr><td><p>Create/edit roles and permissions</p></td><td><p>Super Admin</p></td><td><p>Must Have</p></td></tr><tr><td><p>View full customer KYC document</p></td><td><p>Super Admin, restricted Compliance/Customs role only</p></td><td><p>Must Have</p></td></tr><tr><td><p>Download customer KYC document</p></td><td><p>Disabled by default; allow only with explicit permission and audit reason</p></td><td><p>Must Have</p></td></tr><tr><td><p>View vendor bank details</p></td><td><p>Super Admin, Finance Manager only</p></td><td><p>Must Have</p></td></tr><tr><td><p>Approve vendor</p></td><td><p>Super Admin, Vendor Manager</p></td><td><p>Must Have</p></td></tr><tr><td><p>Approve product</p></td><td><p>Product Manager, Super Admin</p></td><td><p>Must Have</p></td></tr><tr><td><p>Override China product data</p></td><td><p>Product Manager, Super Admin</p></td><td><p>Must Have</p></td></tr><tr><td><p>Approve feed update over overwritten product</p></td><td><p>Product Manager, Super Admin</p></td><td><p>Must Have</p></td></tr><tr><td><p>Approve refund to wallet</p></td><td><p>CS Agent up to threshold; Order Manager/Finance above threshold</p></td><td><p>Must Have</p></td></tr><tr><td><p>Approve bank/source refund with deduction fee</p></td><td><p>Finance Manager/Super Admin</p></td><td><p>Must Have</p></td></tr><tr><td><p>Approve high-value refund</p></td><td><p>Super Admin or configured senior approval</p></td><td><p>Must Have</p></td></tr><tr><td><p>Change pricing formula</p></td><td><p>Super Admin, Product Manager if permitted</p></td><td><p>Must Have</p></td></tr><tr><td><p>Manual exchange-rate override</p></td><td><p>Super Admin, Finance Manager</p></td><td><p>Must Have</p></td></tr><tr><td><p>Export accounting reports</p></td><td><p>Finance Manager, Super Admin</p></td><td><p>Must Have</p></td></tr><tr><td><p>Delete/unpublish product</p></td><td><p>Product Manager/Super Admin; delete should be soft-delete only</p></td><td><p>Must Have</p></td></tr><tr><td><p>View audit logs</p></td><td><p>Super Admin, Read-only Auditor</p></td><td><p>Good to Have</p></td></tr></tbody></table>

# 5\. End-to-End Business Workflows

## 5.1 China Product Feed to Customer Delivery Workflow

<table><tbody><tr><td><p><strong>Step</strong></p></td><td><p><strong>Stage</strong></p></td><td><p><strong>Description</strong></p></td><td><p><strong>Owner</strong></p></td></tr><tr><td><p>1</p></td><td><p>Product data enters system</p></td><td><p>China Product Feed is inserted/synced into catalog with source product ID, source SKU/variant, price, stock signal, images and translated/AI-enriched fields.</p></td><td><p>System/Product Admin</p></td></tr><tr><td><p>2</p></td><td><p>Admin review/override</p></td><td><p>Admin can edit title, description, price, images, variants, SEO, tags, compliance fields, delivery estimate and source label.</p></td><td><p>Product Admin</p></td></tr><tr><td><p>3</p></td><td><p>Sync protection</p></td><td><p>If product was manually overwritten, daily feed updates are not auto-applied. Admin sees update suggestions and can approve field-wise/latest update.</p></td><td><p>System/Product Admin</p></td></tr><tr><td><p>4</p></td><td><p>Customer checkout</p></td><td><p>China products are prepaid only. Customer can choose cheaper shipping/import option with KYC, or skip KYC and pay higher shipping/import option.</p></td><td><p>Customer/System</p></td></tr><tr><td><p>5</p></td><td><p>Order created</p></td><td><p>Customer-facing status: Order Confirmed. Internal status: Paid/Awaiting China Team Action.</p></td><td><p>System</p></td></tr><tr><td><p>6</p></td><td><p>China team purchase task</p></td><td><p>Internal China user sees source product, variant, quantity, budget, source link/details, buying instructions and India hub destination. No customer identity displayed.</p></td><td><p>China Team</p></td></tr><tr><td><p>7</p></td><td><p>Availability check</p></td><td><p>China staff verifies product/source availability and marks available, temporarily out of stock, alternate needed, or unavailable.</p></td><td><p>China Team</p></td></tr><tr><td><p>8</p></td><td><p>Purchase completed</p></td><td><p>China staff buys manually and updates purchase reference, cost, seller dispatch ETA and attachments/screenshots if needed.</p></td><td><p>China Team</p></td></tr><tr><td><p>9</p></td><td><p>China QC and consolidation</p></td><td><p>China team receives items, checks, repacks/bundles multiple customer orders or multiple products in one carton, records weights and photos.</p></td><td><p>China Team</p></td></tr><tr><td><p>10</p></td><td><p>International shipment</p></td><td><p>China team creates shipment to India transit hub. Customer-facing status becomes Shipped from China/In Transit based on mapping.</p></td><td><p>China Team/System</p></td></tr><tr><td><p>11</p></td><td><p>India transit hub receiving</p></td><td><p>Hub scans carton/order, marks received, QC checks, splits, repacks and creates local courier shipments.</p></td><td><p>Hub User</p></td></tr><tr><td><p>12</p></td><td><p>Local delivery</p></td><td><p>System auto-assigns Delhivery/BlueDart based on rules, prints labels, tracks delivery and updates customer status.</p></td><td><p>System/Hub</p></td></tr><tr><td><p>13</p></td><td><p>Completion</p></td><td><p>Delivered status, invoice records, profitability finalization, review request and support window.</p></td><td><p>System</p></td></tr></tbody></table>

## 5.2 Indian Vendor Product Workflow

<table><tbody><tr><td><p><strong>Step</strong></p></td><td><p><strong>Stage</strong></p></td><td><p><strong>Description</strong></p></td><td><p><strong>Owner</strong></p></td></tr><tr><td><p>1</p></td><td><p>Vendor registration</p></td><td><p>Vendor self-registers. Account manager contact is shown in vendor dashboard after assignment by admin.</p></td><td><p>Vendor/Admin</p></td></tr><tr><td><p>2</p></td><td><p>Vendor KYC</p></td><td><p>Vendor uploads GST/PAN/bank/address/manufacturing proof/brand certificate where available. Brand/manufacturing proof optional but supported.</p></td><td><p>Vendor</p></td></tr><tr><td><p>3</p></td><td><p>Admin approval</p></td><td><p>Vendor Manager verifies documents, adds remarks, approves/rejects/asks resubmission.</p></td><td><p>Vendor Manager</p></td></tr><tr><td><p>4</p></td><td><p>Subscription</p></td><td><p>First year free. Subscription module tracks expiry, reminders, grace/extension. After expiry, products are unpublished unless admin extends free period.</p></td><td><p>System/Admin</p></td></tr><tr><td><p>5</p></td><td><p>Product creation/import</p></td><td><p>Vendor manually creates products or uploads Amazon/Flipkart/Shopify/generic CSV and maps columns.</p></td><td><p>Vendor</p></td></tr><tr><td><p>6</p></td><td><p>Product approval</p></td><td><p>All vendor-imported/created products require admin approval before going live. Legal metrology fields are mandatory for Indian vendor products.</p></td><td><p>Product Admin</p></td></tr><tr><td><p>7</p></td><td><p>Stock and SLA</p></td><td><p>Vendor maintains live stock. Made-to-order allowed for custom work with custom SLA.</p></td><td><p>Vendor</p></td></tr><tr><td><p>8</p></td><td><p>Customer order</p></td><td><p>Indian vendor product supports COD, prepaid, pay later/BNPL depending on gateway and risk rules.</p></td><td><p>Customer/System</p></td></tr><tr><td><p>9</p></td><td><p>Vendor order action</p></td><td><p>Vendor accepts/prepares order, prints packing slip/invoice if required, marks ready for pickup and uploads package weight/dimensions.</p></td><td><p>Vendor</p></td></tr><tr><td><p>10</p></td><td><p>Pickup/delivery</p></td><td><p>20o.in arranges pickup through delivery partner. Vendor pickup returns go directly to vendor.</p></td><td><p>System/Logistics</p></td></tr><tr><td><p>11</p></td><td><p>Returns/refunds</p></td><td><p>Vendor-specific return policy applies; support handled by platform team. Vendor rating impacted by issues.</p></td><td><p>Support/System</p></td></tr><tr><td><p>12</p></td><td><p>Payout/report</p></td><td><p>No commission. Vendor sees payout/settlement report, subscription invoice and rating.</p></td><td><p>Finance/System</p></td></tr></tbody></table>

## 5.3 Mixed Cart Workflow

*   Cart can contain both China and Indian vendor products.
*   Checkout must split order internally by source/vendor, while showing one customer order confirmation if business wants unified UX.
*   Payment collection must handle prepaid-only constraints. If cart contains any China product, the China item must be prepaid. Indian vendor items may support COD only if split checkout is allowed.
*   Recommended rule: if mixed cart has China + India items, force prepaid for the whole cart in MVP to reduce operational complexity. Future: split payment modes by package.
*   The customer order should have one parent order and multiple sub-orders/fulfillment groups: China group(s), Indian Vendor A group, Indian Vendor B group, etc.
*   Shipping charges, delivery estimate, cancellation rules, return rules and invoices must be calculated per fulfillment group.

## 5.4 Customer-facing vs Internal Order Status Mapping

<table><tbody><tr><td><p><strong>Internal Status</strong></p></td><td><p><strong>Customer Status</strong></p></td><td><p><strong>Notes</strong></p></td></tr><tr><td><p>Paid / Awaiting China Team Action</p></td><td><p>Order Confirmed</p></td><td><p>Order paid and queued for China sourcing.</p></td></tr><tr><td><p>Source Availability Check</p></td><td><p>Shipping in Process</p></td><td><p>China team is checking item/source availability.</p></td></tr><tr><td><p>Temporarily Out of Stock</p></td><td><p>Shipping in Process</p></td><td><p>Admin/China team may wait, find alternate or refund.</p></td></tr><tr><td><p>China Purchase Completed</p></td><td><p>Shipping in Process</p></td><td><p>Do not show Ordered in China to customer. Cancellation blocked after this.</p></td></tr><tr><td><p>China Seller Dispatch Pending</p></td><td><p>Shipping in Process</p></td><td><p>Waiting for source seller to send to China team.</p></td></tr><tr><td><p>Received at China Team</p></td><td><p>Shipping in Process</p></td><td><p>Item arrived with China team.</p></td></tr><tr><td><p>China QC Pending / Passed</p></td><td><p>Shipping in Process</p></td><td><p>QC and bundling are in progress.</p></td></tr><tr><td><p>Bundled for India</p></td><td><p>Shipping in Process</p></td><td><p>Bundled in carton for India shipment.</p></td></tr><tr><td><p>International Shipment Created</p></td><td><p>Shipped from China</p></td><td><p>International tracking generated.</p></td></tr><tr><td><p>International In Transit</p></td><td><p>In Transit</p></td><td><p>Shipment moving toward India.</p></td></tr><tr><td><p>Reached India Hub</p></td><td><p>Reached India</p></td><td><p>Carton/parcel received at transit hub.</p></td></tr><tr><td><p>India QC / Sorting</p></td><td><p>Reached India</p></td><td><p>Sorting, split and local dispatch preparation.</p></td></tr><tr><td><p>Local Courier Assigned</p></td><td><p>In Transit</p></td><td><p>Local courier assigned.</p></td></tr><tr><td><p>Out for Delivery</p></td><td><p>Out for Delivery</p></td><td><p>Final mile courier out for delivery.</p></td></tr><tr><td><p>Delivered</p></td><td><p>Delivered</p></td><td><p>Order complete.</p></td></tr><tr><td><p>Cancelled Before China Purchase</p></td><td><p>Cancelled</p></td><td><p>Allowed only before China Purchase Completed.</p></td></tr><tr><td><p>Refunded / Wallet Refunded</p></td><td><p>Refunded</p></td><td><p>Refund processed.</p></td></tr></tbody></table>

# 6\. Admin Panel Specification

The admin panel must be operationally rich. The developer should treat it as the command center for catalog, orders, sourcing, vendors, pricing, logistics, finance, support, compliance and reporting.

<table><tbody><tr><td><p><strong>Module</strong></p></td><td><p><strong>Core Scope</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Dashboard</p></td><td><p>Sales, orders, source-wise performance, pending tasks, delayed operations, revenue, margin, refunds, vendor health.</p></td><td><p>Must Have</p></td></tr><tr><td><p>RBAC/User Management</p></td><td><p>Create admin users, assign roles, restrict sensitive actions, audit all changes.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Product Management</p></td><td><p>China Product Feed, Indian vendor products, manual products, variants, images, pricing, overwrites, compliance warnings.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Category/Attribute Management</p></td><td><p>Category tree, category margins, attributes, size charts, product type compliance warnings.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Pricing Engine</p></td><td><p>China landed-cost formulas, category/product overrides, exchange rate, margins, rounding, price history.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Vendor Management</p></td><td><p>Vendor onboarding, KYC, approval, account manager, subscription, vendor rating, product approval.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Order Management</p></td><td><p>Parent/sub-orders, split fulfillment, cancellation windows, payment mode, fulfillment status, exceptions.</p></td><td><p>Must Have</p></td></tr><tr><td><p>China Operations</p></td><td><p>China team task queue, purchase updates, QC, international shipment, internal status mapping.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Transit Hub/Warehouse</p></td><td><p>Inbound carton scan, QC, sorting, local courier creation, handover, exception logging.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Logistics</p></td><td><p>Delhivery/BlueDart integration, shipping rules, tracking, labels, failed delivery, reverse pickup.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Returns/Refunds/Wallet</p></td><td><p>Returnless refund, wallet refunds, bank refund request, deduction fee, approval workflow.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Support/Tickets</p></td><td><p>Customer complaints, order-linked tickets, internal notes, SLA, refund/return actions.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Finance/Accounting</p></td><td><p>Invoices, tax reports, source/vendor profitability, payout reports, Tally/Zoho-compatible CSV.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Marketing/CMS</p></td><td><p>Homepage, banners, collections, coupons, campaigns, flash sales, recommended products.</p></td><td><p>Good to Have</p></td></tr><tr><td><p>Reviews/Ratings</p></td><td><p>Platform reviews, source marketplace review marker, photo reviews, vendor rating formula.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Reports/Analytics</p></td><td><p>Sales, vendor, China sourcing delay, profit, refunds, failed products, campaigns, high cart abandon.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Settings</p></td><td><p>Global operational settings: exchange rate, shipping, pricing, KYC, return, tax, notifications, integrations.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Audit/Security</p></td><td><p>Audit logs, sensitive field masking, export logs, approval logs, document access logs.</p></td><td><p>Must Have</p></td></tr></tbody></table>

## 6.1 Admin Dashboard

*   Top cards: total GMV, net revenue, gross margin, order count, prepaid orders, COD orders, BNPL/pay-later orders, refunds, wallet liability, pending vendor approvals, pending product approvals, China purchase queue, delayed China orders, India hub pending dispatch, courier exceptions.
*   Source-wise cards: China Product Feed GMV, Indian vendor GMV, China margin, Indian vendor margin, return/refund rate by source, average delivery time by source.
*   Operational alerts: products with price increase, overwritten products with pending feed updates, duplicate product warnings, out-of-stock warning, legal metrology missing fields for Indian products, high-risk compliance warnings, vendor subscription expiring, vendors below rating threshold.
*   Charts: daily orders, category sales, source mix, payment mix, courier success rate, refunds, top products, top vendors, high-abandon products.
*   Task queues: China team pending purchases, hub receiving pending, local courier pending, support tickets pending, refunds needing approval, vendor KYC pending.
*   Filters: date range, source, vendor, category, payment mode, order status, courier, state/city, account manager.

## 6.2 Admin User, Role and Permission Management

*   Super Admin can create, edit, deactivate and lock admin users.
*   Roles should be permission-based, not hardcoded only. Example permissions: product.view, product.edit, product.approve, order.refund.approve, kyc.view\_full, vendor.bank.view, settings.pricing.edit.
*   Every admin user profile should store name, email, mobile, role, department, status, 2FA status, last login, created by, IP/device logs.
*   Admin can create custom roles for future teams.
*   Sensitive permissions should have explicit warnings and optional approval requirement.
*   If possible, support two-factor authentication for Super Admin, Finance and KYC-access users.
*   All admin actions must be audit-logged with before/after values for critical fields.

## 6.3 Product Management - Common Features

<table><tbody><tr><td><p><strong>Feature</strong></p></td><td><p><strong>Requirement</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Product list</p></td><td><p>Search/filter by source, vendor, category, brand/private label, country of origin, status, stock, margin, rating, created date, updated date, sync status, compliance warning.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Product status</p></td><td><p>Draft, Pending Approval, Active, Inactive, Rejected, Archived, Temporarily Hidden, Compliance Hold.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Source type</p></td><td><p>China Product Feed, Indian Vendor, Manual Admin Product.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Product details</p></td><td><p>Title, short title, slug, description, AI rewritten description, highlights, specifications, tags, SEO title/meta, FAQs, care instructions, size chart.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Variants</p></td><td><p>Color, size, material, quantity, SKU, source SKU, price, MRP, stock, weight, dimensions, images, variant-specific status.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Images</p></td><td><p>Download to DigitalOcean Spaces, compress, thumbnail, reorder, alt text, duplicate detection, image quality warning.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Compliance fields</p></td><td><p>Country of origin, manufacturer/packer/importer, net quantity, MRP, month/year, consumer care, certificates/warnings, category-specific compliance fields.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Delivery fields</p></td><td><p>Source-based delivery range, pincode serviceability, weight/dimension, shipping class, return eligibility.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Profit fields</p></td><td><p>Cost, landed cost, selling price, margin, reserve, gateway fee, logistics estimate, refund reserve, final profit after delivery.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Review fields</p></td><td><p>Platform reviews, source marketplace reviews if imported/entered, customer photos, moderation status.</p></td><td><p>Good to Have</p></td></tr></tbody></table>

## 6.4 China Product Feed Product Management

*   Use the term “China Product Feed” in admin and documentation. Do not expose scraping/API details inside business-facing UI.
*   Feed data is added/synced by developer-side process. Admin needs view/edit/override/approve-update UI, not feed setup UI.
*   Feed product screen should show source product ID, source variant ID, source URL/reference if available, original title, translated title, feed price, feed stock signal, feed images, feed last sync date, last verified date, and feed update status.
*   China products are considered available until manually verified and updated by admin/system. Product screen must show “Last verification date/time” and who verified it.
*   When daily sync detects changed price/stock/title/variant, show “New feed update available.” If admin has overwritten a field, do not auto-overwrite that field. Admin can approve individual fields or reject update.
*   Duplicate warning must appear if system detects same source ID, similar title, similar image hash, same SKU/variant, or same source URL.
*   Admin can use AI rewrite for title, description, highlights, SEO title, meta description and product FAQs.
*   Admin can set category-wise and product-wise pricing formula overrides for viral products.
*   Admin can mark China product as: Active, Hidden, Temporarily Not Available, Compliance Warning, Manual Review, Rejected, Archived.
*   Customer-facing China product label options: Direct from China Manufacturer, Ships from China, Imported by 20o.in, Longer Delivery, KYC optional for cheaper import/shipping, prepaid only.

### 6.5 China Product Feed Update Review Screen

<table><tbody><tr><td><p><strong>Data Area</strong></p></td><td><p><strong>Current Website Data</strong></p></td><td><p><strong>Latest Feed Data</strong></p></td><td><p><strong>Admin Action</strong></p></td></tr><tr><td><p>Field</p></td><td><p>Current Website Value</p></td><td><p>Latest Feed Value</p></td><td><p>Action</p></td></tr><tr><td><p>Price</p></td><td><p>Current selling/cost price</p></td><td><p>Latest feed price</p></td><td><p>Approve update / Ignore / Apply only cost / Create margin alert</p></td></tr><tr><td><p>Stock signal</p></td><td><p>Current admin value</p></td><td><p>Latest stock signal</p></td><td><p>Approve / Mark needs verification / Keep current</p></td></tr><tr><td><p>Title/description</p></td><td><p>Current rewritten content</p></td><td><p>Latest translated/original content</p></td><td><p>Do not overwrite by default; show compare and allow manual copy</p></td></tr><tr><td><p>Variants</p></td><td><p>Current active variants</p></td><td><p>New/removed variants</p></td><td><p>Approve new variants / hide removed variants / map variants</p></td></tr><tr><td><p>Images</p></td><td><p>Current DO Spaces images</p></td><td><p>Latest feed images</p></td><td><p>Show only; no image history required; allow replace/add manually</p></td></tr></tbody></table>

## 6.6 Indian Vendor Product Management

*   Vendor-created/imported products must always go to admin approval before publishing.
*   Legal metrology fields are mandatory for Indian vendor products before approval.
*   Vendor controls pricing, but admin can lock fields or override return eligibility/category/source labels where needed.
*   Vendor can manage live stock and made-to-order status for custom work only.
*   Admin can approve, reject, request changes, edit directly, lock fields, unpublish and bulk moderate vendor products.
*   Admin should be able to see vendor product history: who created, CSV import batch, approval remarks, edits, stock changes, price changes and customer complaints.
*   Vendor products can support COD/prepaid/BNPL based on payment rules. Product-level COD eligibility should be configurable by admin.

## 6.7 Category and Attribute Management

*   Multi-level category tree: department → category → subcategory → product type.
*   Category fields: name, slug, parent, description, image, icon, SEO title/meta, display order, active status.
*   Category-level source settings: allow China products, allow Indian vendor products, allow COD, allow BNPL, require KYC warning, default delivery range, return policy, compliance warning level.
*   Category-level pricing settings: default margin, shipping weight class, return reserve, customs buffer, payment fee, rounding rule.
*   Category-level legal/compliance fields: mandatory fields for Indian vendor products; optional/warning fields for China products.
*   Category-level attribute schema: size, color, material, pattern, gender, fit, capacity, wattage, pack size, dimensions, etc.
*   Restricted category workflow should exist as warning-only by default for China products; manual unpublish/block by admin only.

## 6.8 Pricing Engine and Landed Cost Calculator

<table><tbody><tr><td><p><strong>Pricing Component</strong></p></td><td><p><strong>Requirement</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>China product base cost</p></td><td><p>Cost from China Product Feed/source purchase price.</p></td><td><p>Must Have</p></td></tr><tr><td><p>China local shipping</p></td><td><p>Estimated or entered local shipping cost inside China.</p></td><td><p>Must Have</p></td></tr><tr><td><p>China handling/repacking fee</p></td><td><p>Operational fee for consolidation, repacking, photo/QC, bundling.</p></td><td><p>Must Have</p></td></tr><tr><td><p>International freight</p></td><td><p>Weight/dimension/category-based international shipping cost.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Customs/duty buffer</p></td><td><p>Configurable duty/import buffer; should be editable by category/product.</p></td><td><p>Must Have</p></td></tr><tr><td><p>GST/tax buffer</p></td><td><p>Configurable tax buffer if required by finance/legal model.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Payment gateway fee</p></td><td><p>Gateway fee percentage/fixed amount configurable by payment mode.</p></td><td><p>Must Have</p></td></tr><tr><td><p>BNPL/pay-later fee</p></td><td><p>Separate fee/reserve for BNPL provider costs.</p></td><td><p>Good to Have</p></td></tr><tr><td><p>Return/refund reserve</p></td><td><p>Reserve percentage for damaged/wrong/returnless refunds.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Platform margin</p></td><td><p>Global/category/product margin percentage or fixed amount.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Exchange rate</p></td><td><p>3-day average auto rate with manual override and rate source/history.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Rounding rule</p></td><td><p>Round to nearest 9/49/99/whole number, category/product configurable.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Viral product override</p></td><td><p>Product-level formula override for high-demand products.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Minimum margin guard</p></td><td><p>Warn or block selling price below configured margin threshold.</p></td><td><p>Must Have</p></td></tr></tbody></table>

Landed cost formula should be configurable. Suggested default formula: Final Selling Price = ((China Cost + China Local Shipping + Handling + International Freight + Customs Buffer + Tax Buffer + Return Reserve) × Exchange Rate + Payment Fee + Platform Margin) rounded by configured rule. The developer must not hardcode the formula; store formula components and allow admin overrides.

## 6.9 Exchange Rate Management

*   System fetches exchange rates automatically and uses average of last 3 days.
*   Store exchange rate source name/API, date/time fetched, raw rates, calculated 3-day average and applied rate.
*   Admin can manually override rate with reason. Override must be audit logged.
*   Admin can lock rate for a day or date range.
*   Pricing engine must store which exchange rate was used to calculate product price and order landed cost at time of purchase.

## 6.10 Order Management

<table><tbody><tr><td><p><strong>Feature</strong></p></td><td><p><strong>Requirement</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Order list</p></td><td><p>Search by order ID, customer, phone, email, source, vendor, status, payment, courier, tracking, pincode, delay, refund status.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Parent/sub-order</p></td><td><p>One customer order can split into China group(s) and Indian vendor group(s).</p></td><td><p>Must Have</p></td></tr><tr><td><p>Order detail</p></td><td><p>Customer info, fulfillment groups, products, payment, delivery, status timeline, internal notes, tickets, refunds, invoices, shipment tracking.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Internal notes</p></td><td><p>Only internal notes. No customer-visible notes as per current decision.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Status timeline</p></td><td><p>Every status change recorded with actor, role, timestamp, optional attachment and remarks.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Cancellation rules</p></td><td><p>China: allowed until China Purchase Completed. India: no cancellation without contacting CS.</p></td><td><p>Must Have</p></td></tr><tr><td><p>CS action panel</p></td><td><p>Cancel, refund, partial refund, wallet refund, bank refund request, returnless refund, ticket escalation, alternate product note.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Exception flags</p></td><td><p>Out of stock, price increased, alternate needed, KYC pending, customs hold, damaged, lost, courier failed, vendor delay.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Split shipment</p></td><td><p>Support multiple shipments under one order.</p></td><td><p>Must Have</p></td></tr></tbody></table>

## 6.11 Vendor Management in Admin

*   Vendor list with filters: pending approval, active, rejected, subscription expiring, expired, low rating, high cancellation, high return, assigned account manager, category, city/state.
*   Vendor profile: business name, owner name, mobile/email, GST/PAN, address, pickup locations, bank details, documents, account manager, subscription, rating, product count, order count, complaints.
*   KYC review: approve/reject/resubmit documents with remarks. Brand certificate and manufacturing proof are optional but upload fields must exist.
*   Account manager assignment: assign internal account manager, show manager name/mobile/email in vendor dashboard.
*   Subscription module: first year free; automated reminders before expiry; admin extension; after expiry, vendor products unpublished and new orders blocked; dashboard remains accessible for renewal/reports.
*   Vendor rating: system-calculated score visible to customers and internal users. Admin can view breakdown and override/display-hide if necessary with reason.
*   Vendor penalties: rating reduction for late dispatch, cancellation, fake stock, QC failure, wrong/damaged item, support delay, return disputes.

## 6.12 Support Ticketing

*   Ticket creation from order, customer profile, product, vendor or manual support request.
*   Ticket categories: order delay, refund request, bank refund request, wallet issue, damaged item, wrong item, KYC/customs issue, vendor issue, courier issue, cancellation request, return request, product complaint.
*   Ticket detail: customer, order/sub-order, source/vendor, issue category, priority, status, assigned agent, SLA, attachments, internal notes, linked refund/return actions.
*   Ticket statuses: Open, Pending Customer, Pending Vendor, Pending China Team, Pending Hub, Pending Courier, Escalated, Resolved, Closed.
*   Internal notes only; if customer communication is later added, keep it separate from internal notes.
*   Support agents should not see full KYC document by default. They can see KYC status only.

## 6.13 Marketing, CMS and Homepage Control

*   Admin can manage homepage banners, hero banners, category tiles, curated collections, recommended products, flash-sale sections, “Made in India” sections and “Direct from China Manufacturer” sections.
*   Coupon system: source-specific, vendor-specific, category-specific, new customer, payment-method-specific, minimum order, max discount, usage limit, date range.
*   Campaign tracking: UTM, influencer/campaign code, coupon usage, conversion, GMV and refund rate.
*   Product badges: Direct from Manufacturer, Made in India, Ships from China, Prepaid Only, COD Available, Fast Shipping, KYC Optional, Returnless Refund Eligible.
*   SEO controls: meta title, meta description, canonical URL, OpenGraph image, index/no-index for category/product/landing pages.

# 7\. Vendor Panel Specification

The vendor panel is for Indian manufacturer vendors only. It must be simple, guided and focused on onboarding, product upload/import, live stock, order preparation, return policy, subscription and performance. Vendors do not directly handle customer support; platform team handles customer support.

<table><tbody><tr><td><p><strong>Vendor Module</strong></p></td><td><p><strong>Scope</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Vendor Dashboard</p></td><td><p>Pending approvals, active products, orders to prepare, pickup pending, stock alerts, subscription status, rating, account manager contact.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Onboarding/KYC</p></td><td><p>Business details, GST/PAN, address, pickup locations, bank details, optional brand/manufacturing proofs, document status.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Subscription</p></td><td><p>Free first year, expiry date, reminders, renewal action, invoices, admin extension status.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Product Management</p></td><td><p>Manual creation, CSV import, edit own products, live stock, price, images, variants, return policy, admin approval status.</p></td><td><p>Must Have</p></td></tr><tr><td><p>CSV Import</p></td><td><p>Amazon, Flipkart, Shopify, generic CSV, manual column mapping, import preview, error report.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Orders</p></td><td><p>View own orders, accept/prepare, mark ready for pickup, print packing slip, upload package dimensions/weight, invoice upload if needed.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Returns</p></td><td><p>View return pickup/return-to-vendor cases; vendor pickup returns go directly to vendor.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Payout/Reports</p></td><td><p>Sales, orders, payout/settlement, subscription invoice, product performance, cancellations, rating breakdown.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Support</p></td><td><p>Raise tickets to platform, view platform messages/remarks, account manager contact.</p></td><td><p>Good to Have</p></td></tr></tbody></table>

## 7.1 Vendor Registration and Approval

*   Vendor self-registration form: business name, owner name, email, mobile OTP, password, business type, category interests, city/state, pickup address.
*   After registration, vendor dashboard shows onboarding checklist: business details, documents, bank, pickup location, product upload, approval status.
*   Account manager contact should be visible after admin assigns account manager. If not assigned, show central support contact.
*   Vendor cannot publish products until admin approves vendor profile.
*   Vendor status: Registered, KYC Pending, Under Review, Approved, Rejected, Suspended, Subscription Expired, Deactivated.
*   Admin rejection/resubmission remarks visible in vendor dashboard.

## 7.2 Vendor KYC and Profile Fields

<table><tbody><tr><td><p><strong>Field</strong></p></td><td><p><strong>Requirement</strong></p></td></tr><tr><td><p>Business name / legal name</p></td><td><p>Required</p></td></tr><tr><td><p>Display brand/store name</p></td><td><p>Required</p></td></tr><tr><td><p>Owner/contact person</p></td><td><p>Required</p></td></tr><tr><td><p>Mobile/email</p></td><td><p>Required + OTP/email verification</p></td></tr><tr><td><p>GSTIN</p></td><td><p>Required if GST registered; allow non-GST flow if business allows</p></td></tr><tr><td><p>PAN</p></td><td><p>Required</p></td></tr><tr><td><p>Business address</p></td><td><p>Required</p></td></tr><tr><td><p>Pickup location(s)</p></td><td><p>Required before orders</p></td></tr><tr><td><p>Bank account/UPI</p></td><td><p>Required before payout</p></td></tr><tr><td><p>Cancelled cheque/bank proof</p></td><td><p>Recommended</p></td></tr><tr><td><p>Brand certificate</p></td><td><p>Optional</p></td></tr><tr><td><p>Manufacturing proof</p></td><td><p>Optional</p></td></tr><tr><td><p>Return policy by category</p></td><td><p>Required before products go live</p></td></tr></tbody></table>

## 7.3 Vendor Product Creation

*   Vendor can create products manually with guided form and save as draft.
*   Vendor must add legal metrology fields for Indian products before submitting for approval.
*   Vendor can add multiple variants with SKU, price, MRP, stock, color, size, dimensions, weight, images and return eligibility.
*   Vendor can set COD eligibility request, but admin/payment rules may override.
*   Vendor can set vendor-specific return policy by product/category, but admin can override if needed.
*   Product statuses in vendor panel: Draft, Submitted, Under Review, Changes Requested, Approved/Live, Rejected, Inactive, Unpublished due to Subscription Expiry, Suspended by Admin.
*   Vendor can see admin remarks on rejected/change-request products.

## 7.4 Vendor CSV Import

*   Support Amazon CSV, Flipkart CSV, Shopify CSV and generic CSV upload.
*   Flow: upload CSV → detect headers → manual column mapping → preview first rows → validate required fields → show errors/warnings → import as draft/pending approval.
*   Column mapping should support title, description, SKU, variant SKU, category, price, MRP, stock, images, weight, dimensions, color, size, material, country of origin, manufacturer/packer details, return policy and shipping SLA.
*   If CSV contains image URLs, system should download images to DigitalOcean Spaces, compress and create thumbnails.
*   Import batch record should show file name, rows uploaded, rows imported, rows failed, duplicate warnings and mapping used.
*   All imported products require admin approval before live.

## 7.5 Vendor Order Management

*   Vendor sees only orders containing their own products.
*   Vendor order list filters: New, Accepted, Ready for Pickup, Picked Up, Delivered, Cancelled by Platform, Return Initiated, Returned, Issue Raised.
*   Vendor actions: accept order, reject/raise stock issue, mark ready for pickup, update package weight/dimensions, print packing slip, upload invoice/packing photo, raise support ticket.
*   Indian vendor product cancellation is not allowed by customer without contacting CS. CS can cancel according to internal policy.
*   Vendor should have SLA timers: accept by, ready by, pickup scheduled, late warning.
*   Late dispatch, cancellation, fake stock and wrong/damaged item must affect vendor rating.

## 7.6 Vendor Rating Formula

<table><tbody><tr><td><p><strong>Parameter</strong></p></td><td><p><strong>Suggested Weight</strong></p></td><td><p><strong>Explanation</strong></p></td></tr><tr><td><p>On-time dispatch / pickup readiness</p></td><td><p>25%</p></td><td><p>Higher score if vendor consistently marks orders ready within SLA.</p></td></tr><tr><td><p>Cancellation rate / stock accuracy</p></td><td><p>20%</p></td><td><p>Penalize fake stock or vendor-side cancellation.</p></td></tr><tr><td><p>Return/complaint rate</p></td><td><p>20%</p></td><td><p>Wrong/damaged/quality complaints reduce score.</p></td></tr><tr><td><p>Customer review rating</p></td><td><p>15%</p></td><td><p>Average product/order rating where applicable.</p></td></tr><tr><td><p>Support response / issue resolution</p></td><td><p>10%</p></td><td><p>Vendor response speed to admin/account manager queries.</p></td></tr><tr><td><p>QC failure / packaging issues</p></td><td><p>10%</p></td><td><p>Packaging/quality failures reduce score.</p></td></tr></tbody></table>

Vendor rating is visible to customers and internal users. Admin should see detailed breakdown, rating history, monthly trend and reason codes. The public-facing score may be rounded or bucketed to avoid overexposing internal formulas.

# 8\. China Team Panel Specification

China team users are internal employees. They are not external vendors. Their panel must focus only on purchase execution, product availability verification, source cost updates, QC, bundling, repacking and international dispatch. They should not see customer identity by default.

<table><tbody><tr><td><p><strong>Module</strong></p></td><td><p><strong>Scope</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Purchase Queue</p></td><td><p>Orders needing China team action with source product, variant, quantity, buying budget, priority, deadline.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Availability Check</p></td><td><p>Mark available, temporarily out of stock, alternate needed, unavailable; add note and expected restock date.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Purchase Update</p></td><td><p>Enter source purchase ref, actual cost, purchase date, seller dispatch ETA, attachments/screenshots.</p></td><td><p>Must Have</p></td></tr><tr><td><p>China QC</p></td><td><p>Record received item, QC pass/fail, photos, damage/wrong issue, alternate/refund recommendation.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Bundling/Repacking</p></td><td><p>Group items into carton, record carton ID, weight, dimensions, contents, photos.</p></td><td><p>Must Have</p></td></tr><tr><td><p>International Shipment</p></td><td><p>Create/update international tracking, carrier, export carton status, expected arrival India hub.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Issue Escalation</p></td><td><p>Raise issue to admin/order manager without customer identity.</p></td><td><p>Must Have</p></td></tr></tbody></table>

## 8.1 China Team Purchase Task Detail

*   Task ID, related order item ID, source product name, source product ID/reference, source variant, quantity, expected source cost/budget, allowed purchase cost threshold, translated title, image, product notes, customer-selected variant info, item priority.
*   Do not show customer name, phone, address, email, KYC, payment details or customer support notes.
*   Show India hub destination and required bundling instructions only.
*   Actions: mark availability checked, purchase completed, temporarily out of stock, alternate requested, unavailable, item received, QC passed/failed, bundled, shipped to India.
*   Attach purchase proof/screenshots, source seller details if needed, weight/dimensions, package images, QC photos.
*   All task updates sync to admin order detail and customer-facing status map.

## 8.2 China Team Exceptions

*   Price increased after customer order: business will digest loss. China team can enter actual cost; system flags margin loss but does not ask customer for extra payment.
*   Product unavailable: mark unavailable/temporarily out of stock. Admin decides wait, alternate or refund.
*   Wrong/damaged at China QC: mark failed, upload photos, choose repurchase/alternate/refund suggestion.
*   Bundle missing item: mark missing, link affected task, escalate to Order Manager.
*   Shipment delay: update international shipment ETA and reason.

# 9\. Transit Warehouse/Hub Panel Specification

The India hub is a transit warehouse, not a long-term storage warehouse. Items received today should be shipped today; items received by evening should be dispatched next morning. Hub users are internal employees with operational access only.

<table><tbody><tr><td><p><strong>Module</strong></p></td><td><p><strong>Scope</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Inbound Cartons</p></td><td><p>View expected China cartons, scan carton ID, mark received, record arrival time.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Carton Detail</p></td><td><p>Contents, linked order items, China QC photos, expected count, weight, dimensions, tracking.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Receiving QC</p></td><td><p>Open carton, check items, upload photos, mark complete/missing/damaged/wrong.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Sorting/Splitting</p></td><td><p>Split bundled China carton into customer/local shipments.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Packing</p></td><td><p>Record final package weight/dimensions, print labels, packing slip, add package photos.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Courier Assignment</p></td><td><p>Auto-assign Delhivery/BlueDart by rules; manual override with reason.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Handover</p></td><td><p>Mark handed to courier, scan manifest, upload handover proof.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Exception Management</p></td><td><p>Missing item, damage, weight mismatch, address issue, courier pickup failed.</p></td><td><p>Must Have</p></td></tr></tbody></table>

## 9.1 Hub User Permissions

*   Hub user can view only orders/items that reached or are expected at the India hub.
*   Hub user can see customer shipping address only when creating local courier shipment. KYC document is not visible.
*   Hub user can update package weight/dimensions, QC result, local courier, handover status and exceptions.
*   Hub user cannot edit product price, customer payment, refund, vendor bank data, vendor approval or system settings.
*   Every scan and status update must be timestamped and audit logged.

## 9.2 Hub SLA Rules

*   If carton received before configured cut-off time, dispatch same day where possible.
*   If received after evening cut-off, dispatch next morning.
*   Dashboard should show aging: received 0-4 hours, 4-8 hours, overnight, breached SLA.
*   Escalation alert if any received package remains unshipped beyond configured SLA.
*   Hub productivity report: cartons received, orders sorted, packages dispatched, exceptions, average processing time.

# 10\. Product, Pricing and Compliance Architecture

## 10.1 Product Data Model - High Level

<table><tbody><tr><td><p><strong>Entity</strong></p></td><td><p><strong>Purpose</strong></p></td></tr><tr><td><p>Product</p></td><td><p>Base product record shown on website. Stores title, source type, category, status, SEO, badges, legal fields, delivery settings, return eligibility.</p></td></tr><tr><td><p>ProductVariant</p></td><td><p>Variant-level SKU, source SKU, color/size/material, price, MRP, stock, weight, dimensions, image mapping.</p></td></tr><tr><td><p>ProductSource</p></td><td><p>Source-specific metadata: China Product Feed ID, vendor ID, source URL/reference, last sync, last verified, source cost/stock.</p></td></tr><tr><td><p>ProductOverride</p></td><td><p>Tracks fields manually overwritten by admin/vendor and protects them from automatic sync overwrite.</p></td></tr><tr><td><p>ProductFeedUpdate</p></td><td><p>Stores latest feed changes awaiting admin approval for overwritten products.</p></td></tr><tr><td><p>ProductImage</p></td><td><p>DigitalOcean Spaces URL, thumbnail URL, alt text, order, variant mapping, image hash.</p></td></tr><tr><td><p>ProductCompliance</p></td><td><p>Legal metrology fields, country of origin, certificate fields, compliance warning status.</p></td></tr><tr><td><p>PriceHistory</p></td><td><p>Stores cost/selling price/margin/exchange rate changes over time.</p></td></tr><tr><td><p>InventoryStock</p></td><td><p>Vendor live stock or China availability signal with timestamp/source.</p></td></tr></tbody></table>

## 10.2 Product Statuses

<table><tbody><tr><td><p><strong>Status</strong></p></td><td><p><strong>Meaning</strong></p></td><td><p><strong>Visible to Customer?</strong></p></td></tr><tr><td><p>Draft</p></td><td><p>Created but not submitted/published.</p></td><td><p>No</p></td></tr><tr><td><p>Pending Approval</p></td><td><p>Vendor product awaiting admin approval.</p></td><td><p>No</p></td></tr><tr><td><p>Changes Requested</p></td><td><p>Admin requested vendor changes.</p></td><td><p>No</p></td></tr><tr><td><p>Active</p></td><td><p>Published and purchasable.</p></td><td><p>Yes</p></td></tr><tr><td><p>Inactive</p></td><td><p>Hidden temporarily.</p></td><td><p>No</p></td></tr><tr><td><p>Temporarily Not Available</p></td><td><p>Visible optionally but not purchasable, or hidden based on setting.</p></td><td><p>Configurable</p></td></tr><tr><td><p>Compliance Warning</p></td><td><p>Product has warning; may still be live unless admin blocks.</p></td><td><p>Configurable</p></td></tr><tr><td><p>Compliance Hold</p></td><td><p>Manual hold by admin.</p></td><td><p>No</p></td></tr><tr><td><p>Rejected</p></td><td><p>Rejected by admin.</p></td><td><p>No</p></td></tr><tr><td><p>Archived</p></td><td><p>Soft-deleted/retired.</p></td><td><p>No</p></td></tr></tbody></table>

## 10.3 Legal Metrology and Product Declaration Fields

Legal metrology fields are mandatory for Indian vendor products and optional/warning-based for China products. The product form should still contain these fields for all products to support compliance, import documentation and customer clarity.

<table><tbody><tr><td><p><strong>Field</strong></p></td><td><p><strong>Indian Vendor Product</strong></p></td><td><p><strong>China Product</strong></p></td></tr><tr><td><p>Manufacturer name/address</p></td><td><p>Mandatory</p></td><td><p>Optional/Warning</p></td></tr><tr><td><p>Packer name/address</p></td><td><p>Mandatory if applicable</p></td><td><p>Optional/Warning</p></td></tr><tr><td><p>Importer name/address</p></td><td><p>N/A or 20o.in if imported by company</p></td><td><p>Optional/20o.in if applicable</p></td></tr><tr><td><p>Country of origin</p></td><td><p>Mandatory</p></td><td><p>Recommended/visible</p></td></tr><tr><td><p>Common/generic product name</p></td><td><p>Mandatory</p></td><td><p>Recommended</p></td></tr><tr><td><p>Net quantity / pack quantity</p></td><td><p>Mandatory</p></td><td><p>Recommended</p></td></tr><tr><td><p>MRP inclusive of taxes</p></td><td><p>Mandatory</p></td><td><p>Recommended/price display</p></td></tr><tr><td><p>Month/year of manufacture/packing/import</p></td><td><p>Mandatory if applicable</p></td><td><p>Optional/Warning</p></td></tr><tr><td><p>Consumer care details</p></td><td><p>Mandatory/platform/vendor as configured</p></td><td><p>Platform care details</p></td></tr><tr><td><p>Unit sale price</p></td><td><p>Mandatory where applicable</p></td><td><p>Optional</p></td></tr><tr><td><p>Best before/expiry</p></td><td><p>Mandatory only relevant categories; preferably avoid China categories requiring this</p></td><td><p>Warning/avoid</p></td></tr><tr><td><p>Certificate/compliance document</p></td><td><p>Optional/category-specific</p></td><td><p>Optional/category-specific warning</p></td></tr></tbody></table>

## 10.4 Compliance Warning Engine

*   The system should show warnings for risky China categories/products but not auto-unpublish unless admin manually configures a specific category rule.
*   Warning sources: category, keyword, product type, attribute, source title, compliance field missing, certificate missing, BIS/QCO-risk tag, wireless/Bluetooth tag, battery/power tag, food/cosmetic/medicine tag.
*   Admin can configure warning rules by category and keyword.
*   Warning severity: Info, Warning, High Risk, Manual Review Recommended.
*   Product detail should show compliance warning banner and checklist.
*   Product listing should have filter “Compliance Warning”.
*   Admin can manually mark product as Compliance Hold, Active with Warning, or Rejected.
*   All compliance decisions must be audit logged.

## 10.5 Suggested High-Risk Category Warning List

*   Electronics or electrical products that may require BIS/Indian Standards compliance.
*   Wireless/Bluetooth/radio-frequency products that may need WPC-related compliance.
*   Power banks, batteries, chargers and adapters.
*   Toys and baby products.
*   Cosmetics, skincare, food, supplements and ingestible products.
*   Medicines, medical devices, diagnostic products, health claims products.
*   Helmets, safety gear, protective equipment.
*   Sharp tools, regulated weapons, chemicals, flammable products.
*   Branded/counterfeit-risk products. Business direction is unbranded/private-label/manufacturer products only.

# 11\. Order, Cancellation, Return, Refund and Wallet Architecture

## 11.1 Order Data Structure

<table><tbody><tr><td><p><strong>Entity</strong></p></td><td><p><strong>Purpose</strong></p></td></tr><tr><td><p>Order</p></td><td><p>Parent order placed by customer. Stores customer, payment, totals, billing/shipping, source mix, wallet usage, status summary.</p></td></tr><tr><td><p>OrderItem</p></td><td><p>Each product/variant purchased. Stores source, vendor, China task link, cost snapshot, price snapshot, return eligibility.</p></td></tr><tr><td><p>FulfillmentGroup</p></td><td><p>Groups order items by source/vendor/logistics path: China, Vendor A, Vendor B.</p></td></tr><tr><td><p>PaymentTransaction</p></td><td><p>Gateway transaction, payment mode, status, refund references, BNPL info.</p></td></tr><tr><td><p>ChinaPurchaseTask</p></td><td><p>China-specific purchasing, QC, bundling and international shipment task.</p></td></tr><tr><td><p>Shipment</p></td><td><p>International or local shipment with carrier, AWB, status, tracking events.</p></td></tr><tr><td><p>OrderStatusTimeline</p></td><td><p>All internal/customer status changes with actor/timestamp.</p></td></tr><tr><td><p>Refund</p></td><td><p>Wallet refund, bank/source refund request, deduction fee, approval flow.</p></td></tr><tr><td><p>ReturnRequest</p></td><td><p>Return/returnless refund case linked to order item.</p></td></tr><tr><td><p>WalletTransaction</p></td><td><p>Wallet credit/debit/refund/adjustment records.</p></td></tr></tbody></table>

## 11.2 Cancellation Rules

*   China product: customer can cancel only until internal status “China Purchase Completed”. After that, cancellation is blocked unless admin approves exception.
*   Customer-facing UI should show cancellation window clearly based on current status.
*   Indian vendor product: no self-cancellation without contacting customer support.
*   CS cancellation actions must require reason code and optional refund method.
*   If platform cancels due to unavailable China product, refund should be wallet by default unless CS processes bank/source refund as requested.
*   If customer requests bank/source refund, admin can deduct configured fee and process manually/gateway-supported refund.

## 11.3 Returns and Returnless Refunds

<table><tbody><tr><td><p><strong>Area</strong></p></td><td><p><strong>Rule</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>China products</p></td><td><p>Return only for damaged/wrong item. Returnless refund allowed. No normal preference/size return unless business later changes.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Indian vendor products</p></td><td><p>Vendor-specific return policy by category/product; admin can override.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Return shipping payer</p></td><td><p>20o.in/platform pays as per business decision.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Vendor return path</p></td><td><p>Indian vendor pickup returns go directly back to vendor.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Evidence</p></td><td><p>Customer photos/videos, unboxing proof optional, damage/wrong reason, support remarks.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Refund type</p></td><td><p>Full, partial, returnless refund, wallet refund, bank/source refund request.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Threshold approvals</p></td><td><p>Configure amount thresholds for support vs senior approval.</p></td><td><p>Must Have</p></td></tr></tbody></table>

## 11.4 Wallet System

*   Wallet is used for default refunds and store credits.
*   Wallet transaction types: refund credit, promotional credit, manual adjustment, order payment debit, expiry adjustment, reversal.
*   Wallet balance must be ledger-based; do not store only a mutable balance without transaction ledger.
*   Wallet refunds should link to refund case, order ID, support ticket and approving user.
*   Customer can request bank/source refund via CS. Admin enters deduction fee and refund method/status.
*   Finance dashboard must show wallet liability total, pending bank refunds, refunded amount and deduction fees.

# 12\. Logistics and Shipment Architecture

## 12.1 Logistics Rules

*   Integrate Delhivery and BlueDart as primary delivery partners.
*   Courier assignment should be automatic by pincode, weight, dimensions, product source, payment mode, SLA, cost, COD support and serviceability.
*   Manual courier override should be allowed with reason and audit log.
*   Shipping rules should support global, source-wise, vendor-wise, category-wise, weight-wise, location-wise and courier-wise configuration.
*   The system must support local forward shipment, reverse pickup for returns and failed delivery tracking.
*   For China products, there are two shipment layers: international shipment to India hub and local courier shipment from hub to customer.
*   For Indian vendor products, pickup is arranged from vendor and delivered to customer; returns go back to vendor.

## 12.2 Shipment Statuses

<table><tbody><tr><td><p><strong>Shipment Status</strong></p></td><td><p><strong>Meaning</strong></p></td></tr><tr><td><p>International Shipment Created</p></td><td><p>China shipment to India hub created.</p></td></tr><tr><td><p>International In Transit</p></td><td><p>China shipment moving toward India.</p></td></tr><tr><td><p>Customs/KYC Pending</p></td><td><p>Shipment delayed due to KYC/customs/documentation issue.</p></td></tr><tr><td><p>Reached India Hub</p></td><td><p>Received or ready to receive at hub.</p></td></tr><tr><td><p>Hub QC/Sorting</p></td><td><p>India hub processing.</p></td></tr><tr><td><p>Local Label Created</p></td><td><p>Delhivery/BlueDart label generated.</p></td></tr><tr><td><p>Pickup Scheduled</p></td><td><p>Courier pickup scheduled.</p></td></tr><tr><td><p>Handed to Courier</p></td><td><p>Package handed to courier.</p></td></tr><tr><td><p>In Transit</p></td><td><p>Local courier in transit.</p></td></tr><tr><td><p>Out for Delivery</p></td><td><p>Courier out for delivery.</p></td></tr><tr><td><p>Delivered</p></td><td><p>Delivered to customer.</p></td></tr><tr><td><p>RTO/Failed Delivery</p></td><td><p>Failed delivery/return to sender flow.</p></td></tr><tr><td><p>Lost/Damaged</p></td><td><p>Courier exception requiring support/finance action.</p></td></tr></tbody></table>

# 13\. Finance, Tax, Invoice and Export Architecture

The finance module must support marketplace-like supplier/vendor operations while customer invoice is generated by 20o.in/Indian importer brand. Final tax, TCS/TDS and invoice format must be reviewed by CA/legal advisor.

<table><tbody><tr><td><p><strong>Feature</strong></p></td><td><p><strong>Requirement</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Invoice generation</p></td><td><p>Customer invoice generated by 20o.in. Vendor acts as supplier/manufacturer. China import products separate reporting.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Vendor supplier invoice records</p></td><td><p>Store vendor invoice/packing documents where needed.</p></td><td><p>Must Have</p></td></tr><tr><td><p>GST reports</p></td><td><p>Source-wise, vendor-wise, category-wise GST/tax reports.</p></td><td><p>Must Have</p></td></tr><tr><td><p>TCS/TDS reports</p></td><td><p>Track and export marketplace/vendor related TCS/TDS if applicable after CA configuration.</p></td><td><p>Must Have</p></td></tr><tr><td><p>China import report</p></td><td><p>China product GMV, landed cost, import/shipping cost, KYC option, duty buffer, profitability.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Vendor payout report</p></td><td><p>No commission. Show payable amount, deductions if any, subscription, penalties/adjustments, payout status.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Subscription invoices</p></td><td><p>Annual vendor subscription; first year free; renewal invoices after expiry.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Wallet liability report</p></td><td><p>Total wallet credit/debit, outstanding wallet balance, refunds, expiry if any.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Tally/Zoho CSV export</p></td><td><p>Export orders, invoices, refunds, wallet, vendor payouts, GST/tax summary in compatible CSV.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Profitability</p></td><td><p>Product/order-level estimated and actual profit after source cost, shipping, gateway, refund reserve and actual exceptions.</p></td><td><p>Must Have</p></td></tr></tbody></table>

## 13.1 Payout and Settlement Logic for Indian Vendors

*   No commission. Vendor subscription is the monetization model.
*   Payout can still have adjustments for penalties, refunds, failed orders, damaged/wrong item cases, subscription dues or manual adjustments if business later decides.
*   Vendor settlement cycle should be configurable: weekly, biweekly, monthly or manual.
*   Settlement report should include order ID, product, selling price, payment mode, delivered date, return window status, refund adjustment, payout amount, payout date and UTR/reference.
*   Vendor panel should show payout status: Pending, On Hold, Processing, Paid, Adjusted, Disputed.

# 14\. Reports and Analytics

<table><tbody><tr><td><p><strong>Report</strong></p></td><td><p><strong>Metrics</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Sales dashboard</p></td><td><p>GMV, net revenue, orders, AOV, conversion, source split, category split, payment split.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Profit dashboard</p></td><td><p>Estimated vs actual margin, product profitability, category profitability, China landed cost variance.</p></td><td><p>Must Have</p></td></tr><tr><td><p>China operations report</p></td><td><p>Pending purchase, average sourcing time, out-of-stock cases, price increase losses, QC failures, international shipping delay.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Hub report</p></td><td><p>Cartons received, packages shipped, same-day dispatch %, SLA breaches, exceptions.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Vendor performance</p></td><td><p>Vendor rating, sales, delay, cancellation, return rate, complaints, subscription status.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Product health</p></td><td><p>Imported not published, published no sales, high cart abandon, duplicate warnings, price change alerts, low margin.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Customer support</p></td><td><p>Ticket volume, SLA, refund cases, damaged/wrong items, courier issues, KYC/customs issues.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Marketing</p></td><td><p>Coupon usage, campaign/influencer performance, collection performance, banner clicks, conversion.</p></td><td><p>Good to Have</p></td></tr><tr><td><p>Finance export</p></td><td><p>GST, invoices, refunds, wallet, payouts, TCS/TDS, subscription reports.</p></td><td><p>Must Have</p></td></tr></tbody></table>

# 15\. Notifications and Communication

## 15.1 Notification Channels

*   Email, SMS, WhatsApp and in-app/dashboard notifications should be designed as pluggable providers.
*   Admin notification center for pending tasks and escalations.
*   Vendor notification center for approval, product changes, orders, pickup, returns, subscription reminders.
*   Customer notifications for order confirmed, shipping in process, shipped from China, in transit, reached India, out for delivery, delivered, refund/wallet updates, KYC reminder if applicable.

## 15.2 Key Notification Events

<table><tbody><tr><td><p><strong>Audience</strong></p></td><td><p><strong>Event</strong></p></td></tr><tr><td><p>Customer</p></td><td><p>Order confirmed, payment success/failure, KYC upload reminder, shipped from China, reached India, out for delivery, delivered, refund processed, wallet credited.</p></td></tr><tr><td><p>Vendor</p></td><td><p>Registration received, KYC approved/rejected, product change request, product approved/rejected, new order, pickup scheduled, return initiated, subscription expiring/expired.</p></td></tr><tr><td><p>China Team</p></td><td><p>New China purchase task, availability check pending, purchase SLA breach, QC issue, shipment deadline.</p></td></tr><tr><td><p>Hub User</p></td><td><p>Incoming carton expected, carton delayed, carton received, package aging breach, courier pickup failed.</p></td></tr><tr><td><p>Admin</p></td><td><p>High refund request, vendor low rating, expired subscription, compliance warning, feed price increase, duplicate warning, courier exception, KYC pending.</p></td></tr></tbody></table>

# 16\. Security, Privacy, Audit Logs and KYC Data Handling

Because the platform stores full KYC document image/PDF until the user deletes their account, the system must treat KYC as highly sensitive data. Access should be minimized, encrypted, logged and restricted.

<table><tbody><tr><td><p><strong>Control</strong></p></td><td><p><strong>Requirement</strong></p></td><td><p><strong>Priority</strong></p></td></tr><tr><td><p>Authentication</p></td><td><p>Strong password policy, OTP/email verification, optional 2FA for admin-sensitive roles.</p></td><td><p>Must Have</p></td></tr><tr><td><p>RBAC</p></td><td><p>Permission-level access, especially for KYC, bank details, refunds, settings and exports.</p></td><td><p>Must Have</p></td></tr><tr><td><p>KYC encryption</p></td><td><p>Encrypt KYC documents at rest and restrict direct public URL access. Store in private bucket/path.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Signed URLs</p></td><td><p>Use short-lived signed URLs for viewing KYC/docs/media not meant for public.</p></td><td><p>Must Have</p></td></tr><tr><td><p>KYC access log</p></td><td><p>Log every view/download with user, role, reason, IP, timestamp.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Data retention</p></td><td><p>Store KYC until account deletion as business decision. On deletion request, trigger verified deletion/anonymization workflow unless legal hold applies.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Consent/notice</p></td><td><p>Show clear notice on why KYC is collected and where it is used before upload.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Audit logs</p></td><td><p>Before/after logs for product price, status, refund, vendor bank, KYC, role, settings and order status changes.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Soft delete</p></td><td><p>Use soft delete for critical objects; avoid hard delete except privacy deletion workflow.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Export logs</p></td><td><p>Record every CSV/export download with filters and user.</p></td><td><p>Must Have</p></td></tr><tr><td><p>Rate limiting</p></td><td><p>Admin login, OTP and customer KYC upload endpoints should have rate limits.</p></td><td><p>Must Have</p></td></tr><tr><td><p>File validation</p></td><td><p>Validate file type, size, malware scan if possible, image/PDF only for KYC.</p></td><td><p>Good to Have</p></td></tr></tbody></table>

## 16.1 KYC Workflow

*   Checkout shows two China shipping/import options: cheaper option with KYC, higher option without KYC.
*   Customer can choose KYC option before payment. Actual upload may happen later from order page/profile KYC section.
*   Accepted document types should support Aadhaar, PAN, Passport and Voter ID at minimum. Driving License can be added if operations confirms courier/customs partner acceptance.
*   KYC status: Not Required, Required Pending Upload, Uploaded Pending Review, Approved, Rejected, Resubmission Required, Submitted to Courier/Customs, Expired/Needs Update.
*   KYC reviewer should see full document only if role permission allows.
*   Support agents should see KYC status, not full file.
*   If KYC pending blocks customs/shipping, customer notification should be triggered and admin dashboard should show alert.
*   KYC upload should have customer notice: purpose, usage, retention until account deletion, access restriction and support contact.

# 17\. Suggested MERN Architecture

## 17.1 Recommended Services/Modules

<table><tbody><tr><td><p><strong>Layer</strong></p></td><td><p><strong>Recommendation</strong></p></td></tr><tr><td><p>Frontend</p></td><td><p>React/Next.js admin frontend or React SPA; desktop-first admin. Separate vendor/admin/internal panels can share component library.</p></td></tr><tr><td><p>Backend</p></td><td><p>Node.js + Express/NestJS style modular API. Use service/repository pattern.</p></td></tr><tr><td><p>Database</p></td><td><p>MongoDB with well-indexed collections. Use transactions where needed for wallet/order/payment consistency.</p></td></tr><tr><td><p>Queue</p></td><td><p>BullMQ/Redis or equivalent for daily feed sync, image download/compression, notifications, reports, logistics polling.</p></td></tr><tr><td><p>Storage</p></td><td><p>DigitalOcean Spaces for product media and private KYC/vendor documents. Use signed URLs for private assets.</p></td></tr><tr><td><p>Search</p></td><td><p>MongoDB indexes initially; future Elasticsearch/Meilisearch for catalog search if needed.</p></td></tr><tr><td><p>Payments</p></td><td><p>Gateway-agnostic adapter: Razorpay/Cashfree/PhonePe/PayU/BNPL providers can plug in later.</p></td></tr><tr><td><p>Logistics</p></td><td><p>Carrier adapter layer: Delhivery, BlueDart, future carriers.</p></td></tr><tr><td><p>Notifications</p></td><td><p>Provider adapter layer: email, SMS, WhatsApp, push/in-app.</p></td></tr><tr><td><p>Audit</p></td><td><p>Central audit middleware/service for all sensitive mutations.</p></td></tr></tbody></table>

## 17.2 Backend Module Structure

src/modules/auth

src/modules/users-roles

src/modules/vendors

src/modules/vendor-subscriptions

src/modules/products

src/modules/categories-attributes

src/modules/product-feed

src/modules/pricing-exchange

src/modules/cart-checkout

src/modules/orders

src/modules/china-operations

src/modules/hub-operations

src/modules/logistics

src/modules/payments-wallet

src/modules/returns-refunds

src/modules/support-tickets

src/modules/reviews-ratings

src/modules/finance-reports

src/modules/cms-marketing

src/modules/notifications

src/modules/audit-logs

src/modules/settings

src/jobs/feed-sync

src/jobs/image-processing

src/jobs/notifications

src/jobs/logistics-tracking

src/jobs/reports-export

## 17.3 Key Technical Rules

*   Use immutable ledgers for wallet transactions, price history, audit logs and status timelines.
*   Use soft deletes for products, vendors, orders and documents unless handling customer account deletion request.
*   Use field-level manual override tracking for China feed products.
*   Store price/cost snapshots on order item at checkout so later product price changes do not alter old orders.
*   Use internal status and customer status separately. Do not expose operational language like “Ordered in China” to customers.
*   Use event-driven updates where possible: order status change triggers notification, dashboard counters, audit log and next task creation.
*   Use file processing queue for external image download/compression to avoid slow product import requests.
*   Use private object storage for KYC and vendor bank/document files.

# 18\. Suggested Database Entities

The developer may adapt names, but the following entities should exist conceptually. MongoDB collection design should consider indexing by status, source, vendor, order ID, customer ID, created date, updated date and operational queues.

<table><tbody><tr><td><p><strong>Entity/Collection</strong></p></td><td><p><strong>Purpose</strong></p></td></tr><tr><td><p>User</p></td><td><p>Customers and optionally common identity base.</p></td></tr><tr><td><p>AdminUser</p></td><td><p>Internal admin/employee users.</p></td></tr><tr><td><p>Role</p></td><td><p>Role name, permissions array, sensitivity level.</p></td></tr><tr><td><p>Vendor</p></td><td><p>Indian manufacturer vendor profile.</p></td></tr><tr><td><p>VendorDocument</p></td><td><p>GST/PAN/bank/optional brand/manufacturing proof files.</p></td></tr><tr><td><p>VendorSubscription</p></td><td><p>Plan, free year, expiry, reminders, admin extension.</p></td></tr><tr><td><p>VendorAccountManager</p></td><td><p>Assigned internal manager mapping.</p></td></tr><tr><td><p>Category</p></td><td><p>Category tree and source/category settings.</p></td></tr><tr><td><p>AttributeDefinition</p></td><td><p>Category-specific attributes.</p></td></tr><tr><td><p>Product</p></td><td><p>Base product.</p></td></tr><tr><td><p>ProductVariant</p></td><td><p>Variant/SKU details.</p></td></tr><tr><td><p>ProductImage</p></td><td><p>Media stored in DigitalOcean Spaces.</p></td></tr><tr><td><p>ProductSource</p></td><td><p>China feed/vendor/manual source metadata.</p></td></tr><tr><td><p>ProductOverride</p></td><td><p>Manual field overrides and protection.</p></td></tr><tr><td><p>ProductFeedUpdate</p></td><td><p>Pending feed changes for approval.</p></td></tr><tr><td><p>ProductCompliance</p></td><td><p>Legal/compliance declarations and warnings.</p></td></tr><tr><td><p>PriceHistory</p></td><td><p>Price/cost/margin/exchange rate history.</p></td></tr><tr><td><p>InventoryStock</p></td><td><p>Vendor live stock or China availability verification.</p></td></tr><tr><td><p>Cart</p></td><td><p>Customer cart.</p></td></tr><tr><td><p>Order</p></td><td><p>Parent customer order.</p></td></tr><tr><td><p>OrderItem</p></td><td><p>Order item with product/price/cost snapshot.</p></td></tr><tr><td><p>FulfillmentGroup</p></td><td><p>Source/vendor split group.</p></td></tr><tr><td><p>ChinaPurchaseTask</p></td><td><p>China sourcing task.</p></td></tr><tr><td><p>HubTask</p></td><td><p>Transit warehouse/hub task.</p></td></tr><tr><td><p>Shipment</p></td><td><p>International/local shipment.</p></td></tr><tr><td><p>TrackingEvent</p></td><td><p>Courier/international tracking events.</p></td></tr><tr><td><p>PaymentTransaction</p></td><td><p>Gateway/BNPL/payment records.</p></td></tr><tr><td><p>Refund</p></td><td><p>Refund cases and approvals.</p></td></tr><tr><td><p>Wallet</p></td><td><p>Customer wallet summary.</p></td></tr><tr><td><p>WalletTransaction</p></td><td><p>Ledger of wallet credit/debit.</p></td></tr><tr><td><p>ReturnRequest</p></td><td><p>Return or returnless refund request.</p></td></tr><tr><td><p>SupportTicket</p></td><td><p>CS ticket.</p></td></tr><tr><td><p>Review</p></td><td><p>Customer/source marketplace product reviews.</p></td></tr><tr><td><p>VendorRatingSnapshot</p></td><td><p>Rating calculation snapshots.</p></td></tr><tr><td><p>Invoice</p></td><td><p>Customer invoice and supplier invoice references.</p></td></tr><tr><td><p>PayoutSettlement</p></td><td><p>Vendor payout reports.</p></td></tr><tr><td><p>ExchangeRate</p></td><td><p>Daily rate, 3-day average, source, manual override.</p></td></tr><tr><td><p>PricingRule</p></td><td><p>Global/category/product pricing formula components.</p></td></tr><tr><td><p>ShippingRule</p></td><td><p>Courier/serviceability/weight/location rules.</p></td></tr><tr><td><p>CMSContent</p></td><td><p>Banners, collections, pages.</p></td></tr><tr><td><p>CouponCampaign</p></td><td><p>Coupons and marketing campaign rules.</p></td></tr><tr><td><p>NotificationLog</p></td><td><p>Email/SMS/WhatsApp/in-app sent logs.</p></td></tr><tr><td><p>AuditLog</p></td><td><p>Sensitive action log.</p></td></tr><tr><td><p>SystemSetting</p></td><td><p>Global settings.</p></td></tr><tr><td><p>ExportLog</p></td><td><p>CSV/accounting/report export log.</p></td></tr><tr><td><p>KycDocument</p></td><td><p>Customer import KYC document storage metadata.</p></td></tr></tbody></table>

## 18.1 Critical Indexes

*   products: sourceType, status, categoryId, vendorId, sourceProductId, slug, createdAt, updatedAt, complianceStatus, lastSyncAt, lastVerifiedAt.
*   orders: orderNumber, customerId, status, paymentStatus, sourceMix, createdAt, deliveryPincode.
*   orderItems: orderId, productId, vendorId, sourceType, internalStatus, customerStatus.
*   chinaPurchaseTasks: status, priority, createdAt, dueAt, sourceProductId, assignedTo.
*   hubTasks: status, cartonId, receivedAt, dueAt, assignedTo.
*   vendors: status, subscriptionStatus, accountManagerId, rating, city, categoryIds.
*   supportTickets: status, priority, assignedTo, orderId, category, createdAt.
*   auditLogs: actorId, entityType, entityId, action, createdAt.
*   walletTransactions: customerId, orderId, type, createdAt.

# 19\. API Endpoint Map

This section is not final API design, but gives the developer module boundaries and expected operations.

<table><tbody><tr><td><p><strong>Module</strong></p></td><td><p><strong>Example Endpoints</strong></p></td></tr><tr><td><p>Auth/RBAC</p></td><td><p>POST /admin/auth/login, POST /admin/users, PATCH /admin/users/:id, GET /admin/roles, POST /admin/roles, PATCH /admin/roles/:id</p></td></tr><tr><td><p>Products</p></td><td><p>GET /admin/products, GET /admin/products/:id, PATCH /admin/products/:id, POST /admin/products/:id/approve, POST /admin/products/:id/reject, POST /admin/products/bulk-action</p></td></tr><tr><td><p>Feed Updates</p></td><td><p>GET /admin/feed-updates, GET /admin/products/:id/feed-updates, POST /admin/feed-updates/:id/apply, POST /admin/feed-updates/:id/ignore</p></td></tr><tr><td><p>Pricing</p></td><td><p>GET /admin/pricing-rules, POST /admin/pricing-rules, PATCH /admin/pricing-rules/:id, GET /admin/exchange-rates, POST /admin/exchange-rates/override</p></td></tr><tr><td><p>Vendors</p></td><td><p>GET /admin/vendors, GET /admin/vendors/:id, PATCH /admin/vendors/:id/status, POST /admin/vendors/:id/assign-manager, PATCH /admin/vendors/:id/subscription</p></td></tr><tr><td><p>Orders</p></td><td><p>GET /admin/orders, GET /admin/orders/:id, PATCH /admin/orders/:id/status, POST /admin/orders/:id/cancel, POST /admin/orders/:id/internal-note</p></td></tr><tr><td><p>China Ops</p></td><td><p>GET /china/tasks, GET /china/tasks/:id, PATCH /china/tasks/:id/status, POST /china/tasks/:id/purchase, POST /china/tasks/:id/qc, POST /china/cartons</p></td></tr><tr><td><p>Hub Ops</p></td><td><p>GET /hub/inbound-cartons, POST /hub/cartons/:id/receive, POST /hub/tasks/:id/qc, POST /hub/tasks/:id/create-local-shipment, POST /hub/tasks/:id/handover</p></td></tr><tr><td><p>Logistics</p></td><td><p>GET /admin/shipments, POST /admin/shipments, POST /admin/shipments/:id/track, POST /admin/shipments/:id/cancel, POST /admin/shipments/:id/retry</p></td></tr><tr><td><p>Returns/Refunds</p></td><td><p>GET /admin/refunds, POST /admin/refunds, PATCH /admin/refunds/:id/approve, PATCH /admin/refunds/:id/reject, POST /admin/returns</p></td></tr><tr><td><p>Wallet</p></td><td><p>GET /admin/wallets/:customerId, POST /admin/wallets/:customerId/adjustment, GET /admin/wallet-transactions</p></td></tr><tr><td><p>Support</p></td><td><p>GET /admin/tickets, POST /admin/tickets, PATCH /admin/tickets/:id, POST /admin/tickets/:id/internal-note</p></td></tr><tr><td><p>Vendor Panel</p></td><td><p>GET /vendor/dashboard, PATCH /vendor/profile, POST /vendor/documents, GET /vendor/products, POST /vendor/products, POST /vendor/products/import-csv, GET /vendor/orders, PATCH /vendor/orders/:id/status</p></td></tr><tr><td><p>Reports</p></td><td><p>GET /admin/reports/sales, GET /admin/reports/profit, GET /admin/reports/vendors, GET /admin/reports/china-ops, POST /admin/exports/tally-csv</p></td></tr></tbody></table>

# 20\. Phase-wise Delivery Plan

<table><tbody><tr><td><p><strong>Phase</strong></p></td><td><p><strong>Scope</strong></p></td></tr><tr><td><p>Phase 1 - Launch Must Have</p></td><td><p>Admin auth/RBAC, vendor onboarding, product management, China Product Feed view/override, daily sync update review, category/attribute, pricing engine, exchange rate, order split, China team panel, hub panel, vendor panel, logistics adapters, wallet/refund, support tickets, finance CSV, audit logs, DigitalOcean media, basic reports.</p></td></tr><tr><td><p>Phase 1.5 - Stabilization</p></td><td><p>Advanced dashboards, vendor rating public display, returnless refund automation, hub SLA reporting, vendor subscription reminders/expiry automation, more CSV templates, marketing CMS/coupons, duplicate image detection improvements.</p></td></tr><tr><td><p>Phase 2 - Growth</p></td><td><p>Direct payment gateway/BNPL provider integrations, advanced search, customer review photo moderation, campaign analytics, product recommendation rules, courier optimization, profitability forecasting, direct Zoho/Tally integration if needed.</p></td></tr><tr><td><p>Future</p></td><td><p>Mobile app, app push notifications, advanced AI product enrichment at scale, direct vendor marketplace API imports if business obtains API access, automated compliance category classification, advanced WMS if long-term inventory is introduced.</p></td></tr></tbody></table>

# 21\. Acceptance Criteria and QA Checklist

<table><tbody><tr><td><p><strong>Area</strong></p></td><td><p><strong>Acceptance Criteria</strong></p></td></tr><tr><td><p>RBAC</p></td><td><p>A user without KYC permission cannot view/download KYC documents. Sensitive actions are audit logged.</p></td></tr><tr><td><p>Product overwrite</p></td><td><p>If admin overwrites China product title/price/images/description, daily sync does not overwrite it automatically. Pending updates are shown for approval.</p></td></tr><tr><td><p>Duplicate warning</p></td><td><p>System warns for same source ID/URL or similar image/title duplicate.</p></td></tr><tr><td><p>Indian product compliance</p></td><td><p>Indian vendor product cannot be approved without mandatory legal metrology fields.</p></td></tr><tr><td><p>China compliance warning</p></td><td><p>Risky China product shows warning but is not auto-unpublished unless admin manually changes status.</p></td></tr><tr><td><p>Pricing</p></td><td><p>China product selling price uses configured formula, exchange rate average, margin and rounding. Product-level override works.</p></td></tr><tr><td><p>Exchange rate</p></td><td><p>3-day average is recorded; manual override has reason and audit log.</p></td></tr><tr><td><p>Mixed cart</p></td><td><p>Order splits internally by source/vendor and creates correct fulfillment groups.</p></td></tr><tr><td><p>China cancellation</p></td><td><p>Customer can cancel before China Purchase Completed; after that, cancellation is blocked except admin exception.</p></td></tr><tr><td><p>Customer status</p></td><td><p>Customer never sees “Ordered in China”; sees Shipping in Process, Shipped from China, In Transit, Reached India, etc.</p></td></tr><tr><td><p>China team privacy</p></td><td><p>China user sees sourcing/product data only, not customer identity/KYC.</p></td></tr><tr><td><p>Hub workflow</p></td><td><p>Hub user can receive, QC, split, create local shipment and handover courier, but cannot change refund/payment/product price.</p></td></tr><tr><td><p>Vendor subscription expiry</p></td><td><p>After first-year/free period expiry, vendor products are unpublished unless admin extends free period.</p></td></tr><tr><td><p>Vendor CSV import</p></td><td><p>CSV upload supports mapping, preview, errors and imports products as pending approval.</p></td></tr><tr><td><p>Refund wallet</p></td><td><p>Wallet refund creates ledger transaction and links to order/refund/ticket.</p></td></tr><tr><td><p>Bank refund request</p></td><td><p>CS/Finance can record deduction fee and refund status.</p></td></tr><tr><td><p>Logistics</p></td><td><p>System auto-assigns Delhivery/BlueDart by rules and supports manual override with reason.</p></td></tr><tr><td><p>Reports</p></td><td><p>Admin can export Tally/Zoho-compatible CSV for accounting.</p></td></tr><tr><td><p>Audit</p></td><td><p>Critical before/after values are stored for product price/status, refund, role, KYC and vendor bank access.</p></td></tr></tbody></table>

# 22\. Compliance References for Developer Awareness

The developer does not need to interpret law, but the system should provide fields, workflows and controls that allow the business/legal/finance team to comply. Final compliance must be validated by qualified legal/tax/customs professionals.

<table><tbody><tr><td><p><strong>Reference Area</strong></p></td><td><p><strong>Why It Matters</strong></p></td></tr><tr><td><p>Consumer Protection (E-Commerce) Rules, 2020</p></td><td><p>Marketplace/entity duties, grievance redressal, seller/importer information and consumer-facing disclosures should be considered in platform design. Official source: Department of Consumer Affairs / Gazette.</p></td></tr><tr><td><p>Legal Metrology (Packaged Commodities) Rules, 2011</p></td><td><p>E-commerce product pages should be designed to store/display declarations such as manufacturer/packer/importer, MRP, country of origin, generic name, net quantity, month/year and consumer care details where applicable.</p></td></tr><tr><td><p>BIS compulsory certification lists</p></td><td><p>The product compliance warning engine should help flag categories/products that may require Indian standards/certification.</p></td></tr><tr><td><p>CBIC courier import KYC circular/FAQs</p></td><td><p>Courier imports for individuals may require KYC documents such as Aadhaar, Passport, PAN or Voter ID depending on identity/address requirements and courier/customs process.</p></td></tr><tr><td><p>Digital Personal Data Protection Act, 2023</p></td><td><p>KYC and personal data handling should support notice, purpose limitation, consent/legal basis, security safeguards, access control, audit logs and deletion workflows.</p></td></tr></tbody></table>

# Appendix A - Priority Summary

*   Must Have: All core admin modules, vendor panel, China team panel, hub panel, order split, pricing engine, exchange rates, wallet/refunds, support tickets, logistics, accounting CSV, audit logs and KYC security.
*   Good to Have: Advanced marketing CMS, campaign analytics, file malware scan, advanced search, vendor support workflow improvements, public rating refinements.
*   Future: Mobile app, direct marketplace API imports, direct Tally/Zoho integration, advanced AI automation, advanced WMS if long-term inventory begins.

# Appendix B - Developer Notes

*   Do not hardcode business rules that admin should control. Pricing, shipping, exchange rate, cancellation threshold, refund fee, vendor subscription, category warnings and courier assignment must be configurable.
*   Avoid irreversible deletes. Use soft deletes and audit logs.
*   Design all operations as timelines/events. This is important for support, disputes, customs delays, vendor disputes and finance reconciliation.
*   Keep customer-facing statuses separate from internal statuses.
*   Keep KYC access strictly permission-controlled and log every access.
*   Build source abstraction early: China Product Feed, Indian Vendor, Manual Admin Product. This will prevent messy product/order code later.
*   Use adapters for payment gateways, logistics, notifications and exchange rate providers so integrations can change without rewriting business logic.