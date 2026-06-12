# 20o.in Ecommerce Portal - Admin, Vendor, China Team & Transit Hub Panel Specification

Converted from the provided Word document for Antigravity/Codex use. Keep this file in the project root or `/docs` folder and ask the coding agent to read it before implementation.

20o.in Ecommerce Portal

Detailed Admin Panel, Vendor Panel, China Team Panel & Transit Hub Panel Specification

Developer Handover Document | MERN Stack | Desktop Admin | Marketplace + Direct Import Operations

Version: 1.0 | Prepared for: 20o.in | Prepared date: 11 June 2026

Confidential: For internal product, operations, compliance and development teams only.

| Area | Confirmed Direction |
| --- | --- |
| Business model | Marketplace-style platform; customer-facing seller/invoice handled by 20o.in/Indian importer brand; Indian vendors act as supplier/manufacturer partners. |
| China model | China Product Feed items are listed on website; after prepaid customer order, China staff manually buys, consolidates, repacks/bundles and sends to India hub. |
| Indian model | Indian manufacturer vendors self-register, upload/import products, receive orders, and 20o.in arranges pickup and local delivery. COD allowed only for Indian vendor products. |
| Warehouse model | No long-term inventory storage. China shipments pass through a transit warehouse/hub for same-day/next-morning QC, splitting, repacking and local courier dispatch. |
| Technology | MERN stack, web-only, desktop admin, DigitalOcean Spaces for media, daily product feed sync, background jobs and queue processing. |
| Prioritization | Each module is marked Must Have, Good to Have or Future. |

Important legal note: This document is a technical/admin-panel specification, not legal advice. Final compliance around imports, customs, product category restrictions, GST/TCS/TDS, invoice format, DPDP handling and consumer disclosures should be reviewed by a qualified legal/tax/customs advisor before launch.

## Table of Contents

1. Document Purpose and Product Vision

2. Confirmed Scope and Operating Assumptions

3. Feature Priority Legend

4. User Roles and Permission Model

5. End-to-End Business Workflows

6. Admin Panel Specification

7. Vendor Panel Specification

8. China Team Panel Specification

9. Transit Warehouse/Hub Panel Specification

10. Product, Pricing and Compliance Architecture

11. Order, Cancellation, Return, Refund and Wallet Architecture

12. Logistics and Shipment Architecture

13. Finance, Tax, Invoice and Export Architecture

14. Reports and Analytics

15. Notifications and Communication

16. Security, Privacy, Audit Logs and KYC Data Handling

17. Suggested MERN Architecture

18. Suggested Database Entities

19. API Endpoint Map

20. Phase-wise Delivery Plan

21. Acceptance Criteria and QA Checklist

22. Compliance References for Developer Awareness

## 1. Document Purpose and Product Vision

This document defines the complete admin-side and vendor-side system required for 20o.in, an ecommerce portal that sells products from two parallel supply sources: a China Product Feed and Indian manufacturer vendors. The goal is to provide the developer with a clear blueprint for modules, roles, workflows, statuses, data structures, settings, approvals, operational exceptions and reports.

The product promise is direct-from-manufacturer ecommerce. For China products, items are listed through the China Product Feed; after the customer places a prepaid order, the internal China team buys, consolidates, repacks, quality-checks and ships the goods to India. For Indian products, vendors are preferably manufacturers who manage their own catalog and stock while 20o.in controls platform approval, customer support, pickup, delivery and customer experience.

The platform must support both China imports and Indian vendor products in the same storefront and cart.

The admin panel must be highly operational, not just catalog management. It should manage pricing, approvals, China purchase tasks, transit hub operations, courier assignment, returns, refunds, vendors, subscription, KYC, wallet, invoices, taxes, reports and audit logs.

The vendor panel must be simple enough for manufacturers while still supporting product CSV imports, inventory, order processing, return policy management, subscription, rating, settlement/payout reports and support.

The China team and transit warehouse/hub users are internal employees with restricted work-specific views, not external vendors.

The platform is MERN stack, web-only at launch, and admin is desktop-only.

## 2. Confirmed Scope and Operating Assumptions

| Topic | Confirmed Specification |
| --- | --- |
| Brand/domain | 20o.in |
| Operating model | Marketplace-style system, but customer-facing invoice/seller is 20o.in/Indian importer brand. Vendors are supplier/manufacturer partners. |
| Supply source 1 | China Product Feed. Product data is inserted/synced automatically by developer-side feed logic. Admin does not need API setup UI in this document. |
| Supply source 2 | Indian manufacturer vendors. Vendors self-register and can upload/import products. Admin approves vendors and products. |
| China ordering | Manual by China internal team after customer prepaid order. China team must not see customer identity unless explicitly required later. |
| India hub | Transit warehouse/hub, no long-term inventory storage. Received China parcels are shipped same day or next morning. |
| Prepaid/COD | China products prepaid only. Indian vendor products can support COD, prepaid, pay later/BNPL. |
| KYC | Customer can skip KYC and pay higher shipping/import option. If they choose cheaper shipping/import option, KYC can be initiated before payment and actual upload may happen later. Full document image/PDF is stored until account deletion. |
| Delivery estimate | Dynamic delivery range by source, product, weight, pincode/location and courier SLA. |
| Product categories | Women fashion, men fashion, kitchen appliances, stationery, women accessories and similar lightweight categories. Heavy items may be allowed from Indian vendors. |
| Compliance | BIS-required/high-compliance China products should preferably be avoided. System shows warnings; it does not auto-unpublish unless admin manually configures a category-specific rule later. |
| Product source label | Customer-visible labels such as Direct from China Manufacturer, Made in India, Direct Indian Manufacturer, country of origin, and delivery estimate. |
| Returns | China: damaged/wrong item only, returnless refund possible. India: vendor-specific return policy. Platform handles CS and local delivery coordination. |
| Refund | Default wallet refund. Customer can request bank/source refund through CS; admin may deduct fee. |
| Payment | Gateway-agnostic module; BNPL/pay-later planned for China and Indian products. |
| Storage | DigitalOcean Spaces. External images must be downloaded, compressed, thumbnailed and served from Spaces. |
| Sync | Daily feed sync; price history stored, images history not stored. Manual product overwrites protected; new feed updates shown for admin approval. |
| Accounting | CSV export compatible with Tally/Zoho in Phase 1. |
| Support | Platform team only; vendors do not directly handle customer support. |

### 2.1 Out of Scope for Phase 1

Mobile app. The initial platform is web-only.

Mobile-friendly admin. Admin is desktop-only.

Long-term inventory warehouse management. The India hub is a transit and sorting point only.

Direct API import from Amazon/Flipkart/Shopify for vendors. Vendor imports will be CSV-based with manual column mapping.

Customer-visible consent checkbox specifically for China import, as per current business decision.

Automatic unpublishing of compliance-risk products unless admin manually changes product/category status.

Direct Tally/Zoho Books integration. Phase 1 export is CSV-compatible.

## 3. Feature Priority Legend

| Priority | Meaning | Developer Treatment |
| --- | --- | --- |
| Must Have | Required for launch or core operations. | Design database and UI from day one. Do not treat as optional. |
| Good to Have | Strongly useful, but can be delayed if launch timeline is tight. | Prepare architecture hooks if possible. |
| Future | Advanced feature that can be released after stable operations. | Avoid blocking core architecture; define placeholders/settings where needed. |

## 4. User Roles and Permission Model

The system must use role-based access control. Every admin or internal employee action must be permission-controlled and audit-logged. Admin should be able to create additional admin users and assign roles/permissions. Sensitive information such as customer KYC and vendor bank details must be restricted by default.

| Role | Access Scope | Priority |
| --- | --- | --- |
| Super Admin | Full system access, create roles, approve sensitive actions, global settings, payment/logistics integrations, compliance settings, exports. | Must Have |
| Admin Manager | General operational access except role creation, sensitive KYC, bank details and high-value refund approvals unless permitted. | Must Have |
| Product Manager | Manage categories, product approvals, feed products, overrides, pricing, compliance warnings, SEO, media. | Must Have |
| Order Manager | Manage orders, split orders, cancellation windows, China/internal task status, courier assignment, exceptions. | Must Have |
| China Operations User | Internal employee. View China purchase queue and product sourcing data only; no customer identity. Update purchase, QC and international shipment steps. | Must Have |
| Transit Warehouse/Hub User | Internal employee. Receive China parcels, scan, QC, split, pack, assign/print local labels, handover courier. | Must Have |
| Vendor Manager | Vendor onboarding, KYC review, account manager assignment, vendor products approval, vendor rating moderation, subscription extension. | Must Have |
| Finance Manager | Invoices, GST reports, vendor settlements, wallet/refund reports, TCS/TDS reports, CSV export, subscription invoices. | Must Have |
| Customer Support Agent | View customer orders, tickets, refund requests, complaints, returnless refund flows, internal notes. Cannot see full KYC unless permitted. | Must Have |
| Marketing/CMS Manager | Home banners, collections, coupons, campaigns, SEO blocks, landing pages, notifications. | Good to Have |
| Compliance Officer | Review compliance warnings, restricted categories, legal metrology missing fields, category risks, product blocks. | Good to Have |
| Read-only Auditor | View audit logs, reports and exports without edit/delete permissions. | Good to Have |
| Indian Vendor | External vendor/manufacturer login; manage own profile, catalog, stock, orders, CSV imports, return policy, reports and support. | Must Have |

### 4.1 Permission Matrix

| Permission | Allowed Role(s) | Priority |
| --- | --- | --- |
| Create admin users | Super Admin | Must Have |
| Create/edit roles and permissions | Super Admin | Must Have |
| View full customer KYC document | Super Admin, restricted Compliance/Customs role only | Must Have |
| Download customer KYC document | Disabled by default; allow only with explicit permission and audit reason | Must Have |
| View vendor bank details | Super Admin, Finance Manager only | Must Have |
| Approve vendor | Super Admin, Vendor Manager | Must Have |
| Approve product | Product Manager, Super Admin | Must Have |
| Override China product data | Product Manager, Super Admin | Must Have |
| Approve feed update over overwritten product | Product Manager, Super Admin | Must Have |
| Approve refund to wallet | CS Agent up to threshold; Order Manager/Finance above threshold | Must Have |
| Approve bank/source refund with deduction fee | Finance Manager/Super Admin | Must Have |
| Approve high-value refund | Super Admin or configured senior approval | Must Have |
| Change pricing formula | Super Admin, Product Manager if permitted | Must Have |
| Manual exchange-rate override | Super Admin, Finance Manager | Must Have |
| Export accounting reports | Finance Manager, Super Admin | Must Have |
| Delete/unpublish product | Product Manager/Super Admin; delete should be soft-delete only | Must Have |
| View audit logs | Super Admin, Read-only Auditor | Good to Have |

## 5. End-to-End Business Workflows

### 5.1 China Product Feed to Customer Delivery Workflow

| Step | Stage | Description | Owner |
| --- | --- | --- | --- |
| 1 | Product data enters system | China Product Feed is inserted/synced into catalog with source product ID, source SKU/variant, price, stock signal, images and translated/AI-enriched fields. | System/Product Admin |
| 2 | Admin review/override | Admin can edit title, description, price, images, variants, SEO, tags, compliance fields, delivery estimate and source label. | Product Admin |
| 3 | Sync protection | If product was manually overwritten, daily feed updates are not auto-applied. Admin sees update suggestions and can approve field-wise/latest update. | System/Product Admin |
| 4 | Customer checkout | China products are prepaid only. Customer can choose cheaper shipping/import option with KYC, or skip KYC and pay higher shipping/import option. | Customer/System |
| 5 | Order created | Customer-facing status: Order Confirmed. Internal status: Paid/Awaiting China Team Action. | System |
| 6 | China team purchase task | Internal China user sees source product, variant, quantity, budget, source link/details, buying instructions and India hub destination. No customer identity displayed. | China Team |
| 7 | Availability check | China staff verifies product/source availability and marks available, temporarily out of stock, alternate needed, or unavailable. | China Team |
| 8 | Purchase completed | China staff buys manually and updates purchase reference, cost, seller dispatch ETA and attachments/screenshots if needed. | China Team |
| 9 | China QC and consolidation | China team receives items, checks, repacks/bundles multiple customer orders or multiple products in one carton, records weights and photos. | China Team |
| 10 | International shipment | China team creates shipment to India transit hub. Customer-facing status becomes Shipped from China/In Transit based on mapping. | China Team/System |
| 11 | India transit hub receiving | Hub scans carton/order, marks received, QC checks, splits, repacks and creates local courier shipments. | Hub User |
| 12 | Local delivery | System auto-assigns Delhivery/BlueDart based on rules, prints labels, tracks delivery and updates customer status. | System/Hub |
| 13 | Completion | Delivered status, invoice records, profitability finalization, review request and support window. | System |

### 5.2 Indian Vendor Product Workflow

| Step | Stage | Description | Owner |
| --- | --- | --- | --- |
| 1 | Vendor registration | Vendor self-registers. Account manager contact is shown in vendor dashboard after assignment by admin. | Vendor/Admin |
| 2 | Vendor KYC | Vendor uploads GST/PAN/bank/address/manufacturing proof/brand certificate where available. Brand/manufacturing proof optional but supported. | Vendor |
| 3 | Admin approval | Vendor Manager verifies documents, adds remarks, approves/rejects/asks resubmission. | Vendor Manager |
| 4 | Subscription | First year free. Subscription module tracks expiry, reminders, grace/extension. After expiry, products are unpublished unless admin extends free period. | System/Admin |
| 5 | Product creation/import | Vendor manually creates products or uploads Amazon/Flipkart/Shopify/generic CSV and maps columns. | Vendor |
| 6 | Product approval | All vendor-imported/created products require admin approval before going live. Legal metrology fields are mandatory for Indian vendor products. | Product Admin |
| 7 | Stock and SLA | Vendor maintains live stock. Made-to-order allowed for custom work with custom SLA. | Vendor |
| 8 | Customer order | Indian vendor product supports COD, prepaid, pay later/BNPL depending on gateway and risk rules. | Customer/System |
| 9 | Vendor order action | Vendor accepts/prepares order, prints packing slip/invoice if required, marks ready for pickup and uploads package weight/dimensions. | Vendor |
| 10 | Pickup/delivery | 20o.in arranges pickup through delivery partner. Vendor pickup returns go directly to vendor. | System/Logistics |
| 11 | Returns/refunds | Vendor-specific return policy applies; support handled by platform team. Vendor rating impacted by issues. | Support/System |
| 12 | Payout/report | No commission. Vendor sees payout/settlement report, subscription invoice and rating. | Finance/System |

### 5.3 Mixed Cart Workflow

Cart can contain both China and Indian vendor products.

Checkout must split order internally by source/vendor, while showing one customer order confirmation if business wants unified UX.

Payment collection must handle prepaid-only constraints. If cart contains any China product, the China item must be prepaid. Indian vendor items may support COD only if split checkout is allowed.

Recommended rule: if mixed cart has China + India items, force prepaid for the whole cart in MVP to reduce operational complexity. Future: split payment modes by package.

The customer order should have one parent order and multiple sub-orders/fulfillment groups: China group(s), Indian Vendor A group, Indian Vendor B group, etc.

Shipping charges, delivery estimate, cancellation rules, return rules and invoices must be calculated per fulfillment group.

### 5.4 Customer-facing vs Internal Order Status Mapping

| Internal Status | Customer Status | Notes |
| --- | --- | --- |
| Paid / Awaiting China Team Action | Order Confirmed | Order paid and queued for China sourcing. |
| Source Availability Check | Shipping in Process | China team is checking item/source availability. |
| Temporarily Out of Stock | Shipping in Process | Admin/China team may wait, find alternate or refund. |
| China Purchase Completed | Shipping in Process | Do not show Ordered in China to customer. Cancellation blocked after this. |
| China Seller Dispatch Pending | Shipping in Process | Waiting for source seller to send to China team. |
| Received at China Team | Shipping in Process | Item arrived with China team. |
| China QC Pending / Passed | Shipping in Process | QC and bundling are in progress. |
| Bundled for India | Shipping in Process | Bundled in carton for India shipment. |
| International Shipment Created | Shipped from China | International tracking generated. |
| International In Transit | In Transit | Shipment moving toward India. |
| Reached India Hub | Reached India | Carton/parcel received at transit hub. |
| India QC / Sorting | Reached India | Sorting, split and local dispatch preparation. |
| Local Courier Assigned | In Transit | Local courier assigned. |
| Out for Delivery | Out for Delivery | Final mile courier out for delivery. |
| Delivered | Delivered | Order complete. |
| Cancelled Before China Purchase | Cancelled | Allowed only before China Purchase Completed. |
| Refunded / Wallet Refunded | Refunded | Refund processed. |

## 6. Admin Panel Specification

The admin panel must be operationally rich. The developer should treat it as the command center for catalog, orders, sourcing, vendors, pricing, logistics, finance, support, compliance and reporting.

| Module | Core Scope | Priority |
| --- | --- | --- |
| Dashboard | Sales, orders, source-wise performance, pending tasks, delayed operations, revenue, margin, refunds, vendor health. | Must Have |
| RBAC/User Management | Create admin users, assign roles, restrict sensitive actions, audit all changes. | Must Have |
| Product Management | China Product Feed, Indian vendor products, manual products, variants, images, pricing, overwrites, compliance warnings. | Must Have |
| Category/Attribute Management | Category tree, category margins, attributes, size charts, product type compliance warnings. | Must Have |
| Pricing Engine | China landed-cost formulas, category/product overrides, exchange rate, margins, rounding, price history. | Must Have |
| Vendor Management | Vendor onboarding, KYC, approval, account manager, subscription, vendor rating, product approval. | Must Have |
| Order Management | Parent/sub-orders, split fulfillment, cancellation windows, payment mode, fulfillment status, exceptions. | Must Have |
| China Operations | China team task queue, purchase updates, QC, international shipment, internal status mapping. | Must Have |
| Transit Hub/Warehouse | Inbound carton scan, QC, sorting, local courier creation, handover, exception logging. | Must Have |
| Logistics | Delhivery/BlueDart integration, shipping rules, tracking, labels, failed delivery, reverse pickup. | Must Have |
| Returns/Refunds/Wallet | Returnless refund, wallet refunds, bank refund request, deduction fee, approval workflow. | Must Have |
| Support/Tickets | Customer complaints, order-linked tickets, internal notes, SLA, refund/return actions. | Must Have |
| Finance/Accounting | Invoices, tax reports, source/vendor profitability, payout reports, Tally/Zoho-compatible CSV. | Must Have |
| Marketing/CMS | Homepage, banners, collections, coupons, campaigns, flash sales, recommended products. | Good to Have |
| Reviews/Ratings | Platform reviews, source marketplace review marker, photo reviews, vendor rating formula. | Must Have |
| Reports/Analytics | Sales, vendor, China sourcing delay, profit, refunds, failed products, campaigns, high cart abandon. | Must Have |
| Settings | Global operational settings: exchange rate, shipping, pricing, KYC, return, tax, notifications, integrations. | Must Have |
| Audit/Security | Audit logs, sensitive field masking, export logs, approval logs, document access logs. | Must Have |

### 6.1 Admin Dashboard

Top cards: total GMV, net revenue, gross margin, order count, prepaid orders, COD orders, BNPL/pay-later orders, refunds, wallet liability, pending vendor approvals, pending product approvals, China purchase queue, delayed China orders, India hub pending dispatch, courier exceptions.

Source-wise cards: China Product Feed GMV, Indian vendor GMV, China margin, Indian vendor margin, return/refund rate by source, average delivery time by source.

Operational alerts: products with price increase, overwritten products with pending feed updates, duplicate product warnings, out-of-stock warning, legal metrology missing fields for Indian products, high-risk compliance warnings, vendor subscription expiring, vendors below rating threshold.

Charts: daily orders, category sales, source mix, payment mix, courier success rate, refunds, top products, top vendors, high-abandon products.

Task queues: China team pending purchases, hub receiving pending, local courier pending, support tickets pending, refunds needing approval, vendor KYC pending.

Filters: date range, source, vendor, category, payment mode, order status, courier, state/city, account manager.

### 6.2 Admin User, Role and Permission Management

Super Admin can create, edit, deactivate and lock admin users.

Roles should be permission-based, not hardcoded only. Example permissions: product.view, product.edit, product.approve, order.refund.approve, kyc.view_full, vendor.bank.view, settings.pricing.edit.

Every admin user profile should store name, email, mobile, role, department, status, 2FA status, last login, created by, IP/device logs.

Admin can create custom roles for future teams.

Sensitive permissions should have explicit warnings and optional approval requirement.

If possible, support two-factor authentication for Super Admin, Finance and KYC-access users.

All admin actions must be audit-logged with before/after values for critical fields.

### 6.3 Product Management - Common Features

| Feature | Requirement | Priority |
| --- | --- | --- |
| Product list | Search/filter by source, vendor, category, brand/private label, country of origin, status, stock, margin, rating, created date, updated date, sync status, compliance warning. | Must Have |
| Product status | Draft, Pending Approval, Active, Inactive, Rejected, Archived, Temporarily Hidden, Compliance Hold. | Must Have |
| Source type | China Product Feed, Indian Vendor, Manual Admin Product. | Must Have |
| Product details | Title, short title, slug, description, AI rewritten description, highlights, specifications, tags, SEO title/meta, FAQs, care instructions, size chart. | Must Have |
| Variants | Color, size, material, quantity, SKU, source SKU, price, MRP, stock, weight, dimensions, images, variant-specific status. | Must Have |
| Images | Download to DigitalOcean Spaces, compress, thumbnail, reorder, alt text, duplicate detection, image quality warning. | Must Have |
| Compliance fields | Country of origin, manufacturer/packer/importer, net quantity, MRP, month/year, consumer care, certificates/warnings, category-specific compliance fields. | Must Have |
| Delivery fields | Source-based delivery range, pincode serviceability, weight/dimension, shipping class, return eligibility. | Must Have |
| Profit fields | Cost, landed cost, selling price, margin, reserve, gateway fee, logistics estimate, refund reserve, final profit after delivery. | Must Have |
| Review fields | Platform reviews, source marketplace reviews if imported/entered, customer photos, moderation status. | Good to Have |

### 6.4 China Product Feed Product Management

Use the term “China Product Feed” in admin and documentation. Do not expose scraping/API details inside business-facing UI.

Feed data is added/synced by developer-side process. Admin needs view/edit/override/approve-update UI, not feed setup UI.

Feed product screen should show source product ID, source variant ID, source URL/reference if available, original title, translated title, feed price, feed stock signal, feed images, feed last sync date, last verified date, and feed update status.

China products are considered available until manually verified and updated by admin/system. Product screen must show “Last verification date/time” and who verified it.

When daily sync detects changed price/stock/title/variant, show “New feed update available.” If admin has overwritten a field, do not auto-overwrite that field. Admin can approve individual fields or reject update.

Duplicate warning must appear if system detects same source ID, similar title, similar image hash, same SKU/variant, or same source URL.

Admin can use AI rewrite for title, description, highlights, SEO title, meta description and product FAQs.

Admin can set category-wise and product-wise pricing formula overrides for viral products.

Admin can mark China product as: Active, Hidden, Temporarily Not Available, Compliance Warning, Manual Review, Rejected, Archived.

Customer-facing China product label options: Direct from China Manufacturer, Ships from China, Imported by 20o.in, Longer Delivery, KYC optional for cheaper import/shipping, prepaid only.

#### 6.5 China Product Feed Update Review Screen

| Data Area | Current Website Data | Latest Feed Data | Admin Action |
| --- | --- | --- | --- |
| Field | Current Website Value | Latest Feed Value | Action |
| Price | Current selling/cost price | Latest feed price | Approve update / Ignore / Apply only cost / Create margin alert |
| Stock signal | Current admin value | Latest stock signal | Approve / Mark needs verification / Keep current |
| Title/description | Current rewritten content | Latest translated/original content | Do not overwrite by default; show compare and allow manual copy |
| Variants | Current active variants | New/removed variants | Approve new variants / hide removed variants / map variants |
| Images | Current DO Spaces images | Latest feed images | Show only; no image history required; allow replace/add manually |

### 6.6 Indian Vendor Product Management

Vendor-created/imported products must always go to admin approval before publishing.

Legal metrology fields are mandatory for Indian vendor products before approval.

Vendor controls pricing, but admin can lock fields or override return eligibility/category/source labels where needed.

Vendor can manage live stock and made-to-order status for custom work only.

Admin can approve, reject, request changes, edit directly, lock fields, unpublish and bulk moderate vendor products.

Admin should be able to see vendor product history: who created, CSV import batch, approval remarks, edits, stock changes, price changes and customer complaints.

Vendor products can support COD/prepaid/BNPL based on payment rules. Product-level COD eligibility should be configurable by admin.

### 6.7 Category and Attribute Management

Multi-level category tree: department → category → subcategory → product type.

Category fields: name, slug, parent, description, image, icon, SEO title/meta, display order, active status.

Category-level source settings: allow China products, allow Indian vendor products, allow COD, allow BNPL, require KYC warning, default delivery range, return policy, compliance warning level.

Category-level pricing settings: default margin, shipping weight class, return reserve, customs buffer, payment fee, rounding rule.

Category-level legal/compliance fields: mandatory fields for Indian vendor products; optional/warning fields for China products.

Category-level attribute schema: size, color, material, pattern, gender, fit, capacity, wattage, pack size, dimensions, etc.

Restricted category workflow should exist as warning-only by default for China products; manual unpublish/block by admin only.

### 6.8 Pricing Engine and Landed Cost Calculator

| Pricing Component | Requirement | Priority |
| --- | --- | --- |
| China product base cost | Cost from China Product Feed/source purchase price. | Must Have |
| China local shipping | Estimated or entered local shipping cost inside China. | Must Have |
| China handling/repacking fee | Operational fee for consolidation, repacking, photo/QC, bundling. | Must Have |
| International freight | Weight/dimension/category-based international shipping cost. | Must Have |
| Customs/duty buffer | Configurable duty/import buffer; should be editable by category/product. | Must Have |
| GST/tax buffer | Configurable tax buffer if required by finance/legal model. | Must Have |
| Payment gateway fee | Gateway fee percentage/fixed amount configurable by payment mode. | Must Have |
| BNPL/pay-later fee | Separate fee/reserve for BNPL provider costs. | Good to Have |
| Return/refund reserve | Reserve percentage for damaged/wrong/returnless refunds. | Must Have |
| Platform margin | Global/category/product margin percentage or fixed amount. | Must Have |
| Exchange rate | 3-day average auto rate with manual override and rate source/history. | Must Have |
| Rounding rule | Round to nearest 9/49/99/whole number, category/product configurable. | Must Have |
| Viral product override | Product-level formula override for high-demand products. | Must Have |
| Minimum margin guard | Warn or block selling price below configured margin threshold. | Must Have |

Landed cost formula should be configurable. Suggested default formula: Final Selling Price = ((China Cost + China Local Shipping + Handling + International Freight + Customs Buffer + Tax Buffer + Return Reserve) × Exchange Rate + Payment Fee + Platform Margin) rounded by configured rule. The developer must not hardcode the formula; store formula components and allow admin overrides.

### 6.9 Exchange Rate Management

System fetches exchange rates automatically and uses average of last 3 days.

Store exchange rate source name/API, date/time fetched, raw rates, calculated 3-day average and applied rate.

Admin can manually override rate with reason. Override must be audit logged.

Admin can lock rate for a day or date range.

Pricing engine must store which exchange rate was used to calculate product price and order landed cost at time of purchase.

### 6.10 Order Management

| Feature | Requirement | Priority |
| --- | --- | --- |
| Order list | Search by order ID, customer, phone, email, source, vendor, status, payment, courier, tracking, pincode, delay, refund status. | Must Have |
| Parent/sub-order | One customer order can split into China group(s) and Indian vendor group(s). | Must Have |
| Order detail | Customer info, fulfillment groups, products, payment, delivery, status timeline, internal notes, tickets, refunds, invoices, shipment tracking. | Must Have |
| Internal notes | Only internal notes. No customer-visible notes as per current decision. | Must Have |
| Status timeline | Every status change recorded with actor, role, timestamp, optional attachment and remarks. | Must Have |
| Cancellation rules | China: allowed until China Purchase Completed. India: no cancellation without contacting CS. | Must Have |
| CS action panel | Cancel, refund, partial refund, wallet refund, bank refund request, returnless refund, ticket escalation, alternate product note. | Must Have |
| Exception flags | Out of stock, price increased, alternate needed, KYC pending, customs hold, damaged, lost, courier failed, vendor delay. | Must Have |
| Split shipment | Support multiple shipments under one order. | Must Have |

### 6.11 Vendor Management in Admin

Vendor list with filters: pending approval, active, rejected, subscription expiring, expired, low rating, high cancellation, high return, assigned account manager, category, city/state.

Vendor profile: business name, owner name, mobile/email, GST/PAN, address, pickup locations, bank details, documents, account manager, subscription, rating, product count, order count, complaints.

KYC review: approve/reject/resubmit documents with remarks. Brand certificate and manufacturing proof are optional but upload fields must exist.

Account manager assignment: assign internal account manager, show manager name/mobile/email in vendor dashboard.

Subscription module: first year free; automated reminders before expiry; admin extension; after expiry, vendor products unpublished and new orders blocked; dashboard remains accessible for renewal/reports.

Vendor rating: system-calculated score visible to customers and internal users. Admin can view breakdown and override/display-hide if necessary with reason.

Vendor penalties: rating reduction for late dispatch, cancellation, fake stock, QC failure, wrong/damaged item, support delay, return disputes.

### 6.12 Support Ticketing

Ticket creation from order, customer profile, product, vendor or manual support request.

Ticket categories: order delay, refund request, bank refund request, wallet issue, damaged item, wrong item, KYC/customs issue, vendor issue, courier issue, cancellation request, return request, product complaint.

Ticket detail: customer, order/sub-order, source/vendor, issue category, priority, status, assigned agent, SLA, attachments, internal notes, linked refund/return actions.

Ticket statuses: Open, Pending Customer, Pending Vendor, Pending China Team, Pending Hub, Pending Courier, Escalated, Resolved, Closed.

Internal notes only; if customer communication is later added, keep it separate from internal notes.

Support agents should not see full KYC document by default. They can see KYC status only.

### 6.13 Marketing, CMS and Homepage Control

Admin can manage homepage banners, hero banners, category tiles, curated collections, recommended products, flash-sale sections, “Made in India” sections and “Direct from China Manufacturer” sections.

Coupon system: source-specific, vendor-specific, category-specific, new customer, payment-method-specific, minimum order, max discount, usage limit, date range.

Campaign tracking: UTM, influencer/campaign code, coupon usage, conversion, GMV and refund rate.

Product badges: Direct from Manufacturer, Made in India, Ships from China, Prepaid Only, COD Available, Fast Shipping, KYC Optional, Returnless Refund Eligible.

SEO controls: meta title, meta description, canonical URL, OpenGraph image, index/no-index for category/product/landing pages.

## 7. Vendor Panel Specification

The vendor panel is for Indian manufacturer vendors only. It must be simple, guided and focused on onboarding, product upload/import, live stock, order preparation, return policy, subscription and performance. Vendors do not directly handle customer support; platform team handles customer support.

| Vendor Module | Scope | Priority |
| --- | --- | --- |
| Vendor Dashboard | Pending approvals, active products, orders to prepare, pickup pending, stock alerts, subscription status, rating, account manager contact. | Must Have |
| Onboarding/KYC | Business details, GST/PAN, address, pickup locations, bank details, optional brand/manufacturing proofs, document status. | Must Have |
| Subscription | Free first year, expiry date, reminders, renewal action, invoices, admin extension status. | Must Have |
| Product Management | Manual creation, CSV import, edit own products, live stock, price, images, variants, return policy, admin approval status. | Must Have |
| CSV Import | Amazon, Flipkart, Shopify, generic CSV, manual column mapping, import preview, error report. | Must Have |
| Orders | View own orders, accept/prepare, mark ready for pickup, print packing slip, upload package dimensions/weight, invoice upload if needed. | Must Have |
| Returns | View return pickup/return-to-vendor cases; vendor pickup returns go directly to vendor. | Must Have |
| Payout/Reports | Sales, orders, payout/settlement, subscription invoice, product performance, cancellations, rating breakdown. | Must Have |
| Support | Raise tickets to platform, view platform messages/remarks, account manager contact. | Good to Have |

### 7.1 Vendor Registration and Approval

Vendor self-registration form: business name, owner name, email, mobile OTP, password, business type, category interests, city/state, pickup address.

After registration, vendor dashboard shows onboarding checklist: business details, documents, bank, pickup location, product upload, approval status.

Account manager contact should be visible after admin assigns account manager. If not assigned, show central support contact.

Vendor cannot publish products until admin approves vendor profile.

Vendor status: Registered, KYC Pending, Under Review, Approved, Rejected, Suspended, Subscription Expired, Deactivated.

Admin rejection/resubmission remarks visible in vendor dashboard.

### 7.2 Vendor KYC and Profile Fields

| Field | Requirement |
| --- | --- |
| Business name / legal name | Required |
| Display brand/store name | Required |
| Owner/contact person | Required |
| Mobile/email | Required + OTP/email verification |
| GSTIN | Required if GST registered; allow non-GST flow if business allows |
| PAN | Required |
| Business address | Required |
| Pickup location(s) | Required before orders |
| Bank account/UPI | Required before payout |
| Cancelled cheque/bank proof | Recommended |
| Brand certificate | Optional |
| Manufacturing proof | Optional |
| Return policy by category | Required before products go live |

### 7.3 Vendor Product Creation

Vendor can create products manually with guided form and save as draft.

Vendor must add legal metrology fields for Indian products before submitting for approval.

Vendor can add multiple variants with SKU, price, MRP, stock, color, size, dimensions, weight, images and return eligibility.

Vendor can set COD eligibility request, but admin/payment rules may override.

Vendor can set vendor-specific return policy by product/category, but admin can override if needed.

Product statuses in vendor panel: Draft, Submitted, Under Review, Changes Requested, Approved/Live, Rejected, Inactive, Unpublished due to Subscription Expiry, Suspended by Admin.

Vendor can see admin remarks on rejected/change-request products.

### 7.4 Vendor CSV Import

Support Amazon CSV, Flipkart CSV, Shopify CSV and generic CSV upload.

Flow: upload CSV → detect headers → manual column mapping → preview first rows → validate required fields → show errors/warnings → import as draft/pending approval.

Column mapping should support title, description, SKU, variant SKU, category, price, MRP, stock, images, weight, dimensions, color, size, material, country of origin, manufacturer/packer details, return policy and shipping SLA.

If CSV contains image URLs, system should download images to DigitalOcean Spaces, compress and create thumbnails.

Import batch record should show file name, rows uploaded, rows imported, rows failed, duplicate warnings and mapping used.

All imported products require admin approval before live.

### 7.5 Vendor Order Management

Vendor sees only orders containing their own products.

Vendor order list filters: New, Accepted, Ready for Pickup, Picked Up, Delivered, Cancelled by Platform, Return Initiated, Returned, Issue Raised.

Vendor actions: accept order, reject/raise stock issue, mark ready for pickup, update package weight/dimensions, print packing slip, upload invoice/packing photo, raise support ticket.

Indian vendor product cancellation is not allowed by customer without contacting CS. CS can cancel according to internal policy.

Vendor should have SLA timers: accept by, ready by, pickup scheduled, late warning.

Late dispatch, cancellation, fake stock and wrong/damaged item must affect vendor rating.

### 7.6 Vendor Rating Formula

| Parameter | Suggested Weight | Explanation |
| --- | --- | --- |
| On-time dispatch / pickup readiness | 25% | Higher score if vendor consistently marks orders ready within SLA. |
| Cancellation rate / stock accuracy | 20% | Penalize fake stock or vendor-side cancellation. |
| Return/complaint rate | 20% | Wrong/damaged/quality complaints reduce score. |
| Customer review rating | 15% | Average product/order rating where applicable. |
| Support response / issue resolution | 10% | Vendor response speed to admin/account manager queries. |
| QC failure / packaging issues | 10% | Packaging/quality failures reduce score. |

Vendor rating is visible to customers and internal users. Admin should see detailed breakdown, rating history, monthly trend and reason codes. The public-facing score may be rounded or bucketed to avoid overexposing internal formulas.

## 8. China Team Panel Specification

China team users are internal employees. They are not external vendors. Their panel must focus only on purchase execution, product availability verification, source cost updates, QC, bundling, repacking and international dispatch. They should not see customer identity by default.

| Module | Scope | Priority |
| --- | --- | --- |
| Purchase Queue | Orders needing China team action with source product, variant, quantity, buying budget, priority, deadline. | Must Have |
| Availability Check | Mark available, temporarily out of stock, alternate needed, unavailable; add note and expected restock date. | Must Have |
| Purchase Update | Enter source purchase ref, actual cost, purchase date, seller dispatch ETA, attachments/screenshots. | Must Have |
| China QC | Record received item, QC pass/fail, photos, damage/wrong issue, alternate/refund recommendation. | Must Have |
| Bundling/Repacking | Group items into carton, record carton ID, weight, dimensions, contents, photos. | Must Have |
| International Shipment | Create/update international tracking, carrier, export carton status, expected arrival India hub. | Must Have |
| Issue Escalation | Raise issue to admin/order manager without customer identity. | Must Have |

### 8.1 China Team Purchase Task Detail

Task ID, related order item ID, source product name, source product ID/reference, source variant, quantity, expected source cost/budget, allowed purchase cost threshold, translated title, image, product notes, customer-selected variant info, item priority.

Do not show customer name, phone, address, email, KYC, payment details or customer support notes.

Show India hub destination and required bundling instructions only.

Actions: mark availability checked, purchase completed, temporarily out of stock, alternate requested, unavailable, item received, QC passed/failed, bundled, shipped to India.

Attach purchase proof/screenshots, source seller details if needed, weight/dimensions, package images, QC photos.

All task updates sync to admin order detail and customer-facing status map.

### 8.2 China Team Exceptions

Price increased after customer order: business will digest loss. China team can enter actual cost; system flags margin loss but does not ask customer for extra payment.

Product unavailable: mark unavailable/temporarily out of stock. Admin decides wait, alternate or refund.

Wrong/damaged at China QC: mark failed, upload photos, choose repurchase/alternate/refund suggestion.

Bundle missing item: mark missing, link affected task, escalate to Order Manager.

Shipment delay: update international shipment ETA and reason.

## 9. Transit Warehouse/Hub Panel Specification

The India hub is a transit warehouse, not a long-term storage warehouse. Items received today should be shipped today; items received by evening should be dispatched next morning. Hub users are internal employees with operational access only.

| Module | Scope | Priority |
| --- | --- | --- |
| Inbound Cartons | View expected China cartons, scan carton ID, mark received, record arrival time. | Must Have |
| Carton Detail | Contents, linked order items, China QC photos, expected count, weight, dimensions, tracking. | Must Have |
| Receiving QC | Open carton, check items, upload photos, mark complete/missing/damaged/wrong. | Must Have |
| Sorting/Splitting | Split bundled China carton into customer/local shipments. | Must Have |
| Packing | Record final package weight/dimensions, print labels, packing slip, add package photos. | Must Have |
| Courier Assignment | Auto-assign Delhivery/BlueDart by rules; manual override with reason. | Must Have |
| Handover | Mark handed to courier, scan manifest, upload handover proof. | Must Have |
| Exception Management | Missing item, damage, weight mismatch, address issue, courier pickup failed. | Must Have |

### 9.1 Hub User Permissions

Hub user can view only orders/items that reached or are expected at the India hub.

Hub user can see customer shipping address only when creating local courier shipment. KYC document is not visible.

Hub user can update package weight/dimensions, QC result, local courier, handover status and exceptions.

Hub user cannot edit product price, customer payment, refund, vendor bank data, vendor approval or system settings.

Every scan and status update must be timestamped and audit logged.

### 9.2 Hub SLA Rules

If carton received before configured cut-off time, dispatch same day where possible.

If received after evening cut-off, dispatch next morning.

Dashboard should show aging: received 0-4 hours, 4-8 hours, overnight, breached SLA.

Escalation alert if any received package remains unshipped beyond configured SLA.

Hub productivity report: cartons received, orders sorted, packages dispatched, exceptions, average processing time.

## 10. Product, Pricing and Compliance Architecture

### 10.1 Product Data Model - High Level

| Entity | Purpose |
| --- | --- |
| Product | Base product record shown on website. Stores title, source type, category, status, SEO, badges, legal fields, delivery settings, return eligibility. |
| ProductVariant | Variant-level SKU, source SKU, color/size/material, price, MRP, stock, weight, dimensions, image mapping. |
| ProductSource | Source-specific metadata: China Product Feed ID, vendor ID, source URL/reference, last sync, last verified, source cost/stock. |
| ProductOverride | Tracks fields manually overwritten by admin/vendor and protects them from automatic sync overwrite. |
| ProductFeedUpdate | Stores latest feed changes awaiting admin approval for overwritten products. |
| ProductImage | DigitalOcean Spaces URL, thumbnail URL, alt text, order, variant mapping, image hash. |
| ProductCompliance | Legal metrology fields, country of origin, certificate fields, compliance warning status. |
| PriceHistory | Stores cost/selling price/margin/exchange rate changes over time. |
| InventoryStock | Vendor live stock or China availability signal with timestamp/source. |

### 10.2 Product Statuses

| Status | Meaning | Visible to Customer? |
| --- | --- | --- |
| Draft | Created but not submitted/published. | No |
| Pending Approval | Vendor product awaiting admin approval. | No |
| Changes Requested | Admin requested vendor changes. | No |
| Active | Published and purchasable. | Yes |
| Inactive | Hidden temporarily. | No |
| Temporarily Not Available | Visible optionally but not purchasable, or hidden based on setting. | Configurable |
| Compliance Warning | Product has warning; may still be live unless admin blocks. | Configurable |
| Compliance Hold | Manual hold by admin. | No |
| Rejected | Rejected by admin. | No |
| Archived | Soft-deleted/retired. | No |

### 10.3 Legal Metrology and Product Declaration Fields

Legal metrology fields are mandatory for Indian vendor products and optional/warning-based for China products. The product form should still contain these fields for all products to support compliance, import documentation and customer clarity.

| Field | Indian Vendor Product | China Product |
| --- | --- | --- |
| Manufacturer name/address | Mandatory | Optional/Warning |
| Packer name/address | Mandatory if applicable | Optional/Warning |
| Importer name/address | N/A or 20o.in if imported by company | Optional/20o.in if applicable |
| Country of origin | Mandatory | Recommended/visible |
| Common/generic product name | Mandatory | Recommended |
| Net quantity / pack quantity | Mandatory | Recommended |
| MRP inclusive of taxes | Mandatory | Recommended/price display |
| Month/year of manufacture/packing/import | Mandatory if applicable | Optional/Warning |
| Consumer care details | Mandatory/platform/vendor as configured | Platform care details |
| Unit sale price | Mandatory where applicable | Optional |
| Best before/expiry | Mandatory only relevant categories; preferably avoid China categories requiring this | Warning/avoid |
| Certificate/compliance document | Optional/category-specific | Optional/category-specific warning |

### 10.4 Compliance Warning Engine

The system should show warnings for risky China categories/products but not auto-unpublish unless admin manually configures a specific category rule.

Warning sources: category, keyword, product type, attribute, source title, compliance field missing, certificate missing, BIS/QCO-risk tag, wireless/Bluetooth tag, battery/power tag, food/cosmetic/medicine tag.

Admin can configure warning rules by category and keyword.

Warning severity: Info, Warning, High Risk, Manual Review Recommended.

Product detail should show compliance warning banner and checklist.

Product listing should have filter “Compliance Warning”.

Admin can manually mark product as Compliance Hold, Active with Warning, or Rejected.

All compliance decisions must be audit logged.

### 10.5 Suggested High-Risk Category Warning List

Electronics or electrical products that may require BIS/Indian Standards compliance.

Wireless/Bluetooth/radio-frequency products that may need WPC-related compliance.

Power banks, batteries, chargers and adapters.

Toys and baby products.

Cosmetics, skincare, food, supplements and ingestible products.

Medicines, medical devices, diagnostic products, health claims products.

Helmets, safety gear, protective equipment.

Sharp tools, regulated weapons, chemicals, flammable products.

Branded/counterfeit-risk products. Business direction is unbranded/private-label/manufacturer products only.

## 11. Order, Cancellation, Return, Refund and Wallet Architecture

### 11.1 Order Data Structure

| Entity | Purpose |
| --- | --- |
| Order | Parent order placed by customer. Stores customer, payment, totals, billing/shipping, source mix, wallet usage, status summary. |
| OrderItem | Each product/variant purchased. Stores source, vendor, China task link, cost snapshot, price snapshot, return eligibility. |
| FulfillmentGroup | Groups order items by source/vendor/logistics path: China, Vendor A, Vendor B. |
| PaymentTransaction | Gateway transaction, payment mode, status, refund references, BNPL info. |
| ChinaPurchaseTask | China-specific purchasing, QC, bundling and international shipment task. |
| Shipment | International or local shipment with carrier, AWB, status, tracking events. |
| OrderStatusTimeline | All internal/customer status changes with actor/timestamp. |
| Refund | Wallet refund, bank/source refund request, deduction fee, approval flow. |
| ReturnRequest | Return/returnless refund case linked to order item. |
| WalletTransaction | Wallet credit/debit/refund/adjustment records. |

### 11.2 Cancellation Rules

China product: customer can cancel only until internal status “China Purchase Completed”. After that, cancellation is blocked unless admin approves exception.

Customer-facing UI should show cancellation window clearly based on current status.

Indian vendor product: no self-cancellation without contacting customer support.

CS cancellation actions must require reason code and optional refund method.

If platform cancels due to unavailable China product, refund should be wallet by default unless CS processes bank/source refund as requested.

If customer requests bank/source refund, admin can deduct configured fee and process manually/gateway-supported refund.

### 11.3 Returns and Returnless Refunds

| Area | Rule | Priority |
| --- | --- | --- |
| China products | Return only for damaged/wrong item. Returnless refund allowed. No normal preference/size return unless business later changes. | Must Have |
| Indian vendor products | Vendor-specific return policy by category/product; admin can override. | Must Have |
| Return shipping payer | 20o.in/platform pays as per business decision. | Must Have |
| Vendor return path | Indian vendor pickup returns go directly back to vendor. | Must Have |
| Evidence | Customer photos/videos, unboxing proof optional, damage/wrong reason, support remarks. | Must Have |
| Refund type | Full, partial, returnless refund, wallet refund, bank/source refund request. | Must Have |
| Threshold approvals | Configure amount thresholds for support vs senior approval. | Must Have |

### 11.4 Wallet System

Wallet is used for default refunds and store credits.

Wallet transaction types: refund credit, promotional credit, manual adjustment, order payment debit, expiry adjustment, reversal.

Wallet balance must be ledger-based; do not store only a mutable balance without transaction ledger.

Wallet refunds should link to refund case, order ID, support ticket and approving user.

Customer can request bank/source refund via CS. Admin enters deduction fee and refund method/status.

Finance dashboard must show wallet liability total, pending bank refunds, refunded amount and deduction fees.

## 12. Logistics and Shipment Architecture

### 12.1 Logistics Rules

Integrate Delhivery and BlueDart as primary delivery partners.

Courier assignment should be automatic by pincode, weight, dimensions, product source, payment mode, SLA, cost, COD support and serviceability.

Manual courier override should be allowed with reason and audit log.

Shipping rules should support global, source-wise, vendor-wise, category-wise, weight-wise, location-wise and courier-wise configuration.

The system must support local forward shipment, reverse pickup for returns and failed delivery tracking.

For China products, there are two shipment layers: international shipment to India hub and local courier shipment from hub to customer.

For Indian vendor products, pickup is arranged from vendor and delivered to customer; returns go back to vendor.

### 12.2 Shipment Statuses

| Shipment Status | Meaning |
| --- | --- |
| International Shipment Created | China shipment to India hub created. |
| International In Transit | China shipment moving toward India. |
| Customs/KYC Pending | Shipment delayed due to KYC/customs/documentation issue. |
| Reached India Hub | Received or ready to receive at hub. |
| Hub QC/Sorting | India hub processing. |
| Local Label Created | Delhivery/BlueDart label generated. |
| Pickup Scheduled | Courier pickup scheduled. |
| Handed to Courier | Package handed to courier. |
| In Transit | Local courier in transit. |
| Out for Delivery | Courier out for delivery. |
| Delivered | Delivered to customer. |
| RTO/Failed Delivery | Failed delivery/return to sender flow. |
| Lost/Damaged | Courier exception requiring support/finance action. |

## 13. Finance, Tax, Invoice and Export Architecture

The finance module must support marketplace-like supplier/vendor operations while customer invoice is generated by 20o.in/Indian importer brand. Final tax, TCS/TDS and invoice format must be reviewed by CA/legal advisor.

| Feature | Requirement | Priority |
| --- | --- | --- |
| Invoice generation | Customer invoice generated by 20o.in. Vendor acts as supplier/manufacturer. China import products separate reporting. | Must Have |
| Vendor supplier invoice records | Store vendor invoice/packing documents where needed. | Must Have |
| GST reports | Source-wise, vendor-wise, category-wise GST/tax reports. | Must Have |
| TCS/TDS reports | Track and export marketplace/vendor related TCS/TDS if applicable after CA configuration. | Must Have |
| China import report | China product GMV, landed cost, import/shipping cost, KYC option, duty buffer, profitability. | Must Have |
| Vendor payout report | No commission. Show payable amount, deductions if any, subscription, penalties/adjustments, payout status. | Must Have |
| Subscription invoices | Annual vendor subscription; first year free; renewal invoices after expiry. | Must Have |
| Wallet liability report | Total wallet credit/debit, outstanding wallet balance, refunds, expiry if any. | Must Have |
| Tally/Zoho CSV export | Export orders, invoices, refunds, wallet, vendor payouts, GST/tax summary in compatible CSV. | Must Have |
| Profitability | Product/order-level estimated and actual profit after source cost, shipping, gateway, refund reserve and actual exceptions. | Must Have |

### 13.1 Payout and Settlement Logic for Indian Vendors

No commission. Vendor subscription is the monetization model.

Payout can still have adjustments for penalties, refunds, failed orders, damaged/wrong item cases, subscription dues or manual adjustments if business later decides.

Vendor settlement cycle should be configurable: weekly, biweekly, monthly or manual.

Settlement report should include order ID, product, selling price, payment mode, delivered date, return window status, refund adjustment, payout amount, payout date and UTR/reference.

Vendor panel should show payout status: Pending, On Hold, Processing, Paid, Adjusted, Disputed.

## 14. Reports and Analytics

| Report | Metrics | Priority |
| --- | --- | --- |
| Sales dashboard | GMV, net revenue, orders, AOV, conversion, source split, category split, payment split. | Must Have |
| Profit dashboard | Estimated vs actual margin, product profitability, category profitability, China landed cost variance. | Must Have |
| China operations report | Pending purchase, average sourcing time, out-of-stock cases, price increase losses, QC failures, international shipping delay. | Must Have |
| Hub report | Cartons received, packages shipped, same-day dispatch %, SLA breaches, exceptions. | Must Have |
| Vendor performance | Vendor rating, sales, delay, cancellation, return rate, complaints, subscription status. | Must Have |
| Product health | Imported not published, published no sales, high cart abandon, duplicate warnings, price change alerts, low margin. | Must Have |
| Customer support | Ticket volume, SLA, refund cases, damaged/wrong items, courier issues, KYC/customs issues. | Must Have |
| Marketing | Coupon usage, campaign/influencer performance, collection performance, banner clicks, conversion. | Good to Have |
| Finance export | GST, invoices, refunds, wallet, payouts, TCS/TDS, subscription reports. | Must Have |

## 15. Notifications and Communication

### 15.1 Notification Channels

Email, SMS, WhatsApp and in-app/dashboard notifications should be designed as pluggable providers.

Admin notification center for pending tasks and escalations.

Vendor notification center for approval, product changes, orders, pickup, returns, subscription reminders.

Customer notifications for order confirmed, shipping in process, shipped from China, in transit, reached India, out for delivery, delivered, refund/wallet updates, KYC reminder if applicable.

### 15.2 Key Notification Events

| Audience | Event |
| --- | --- |
| Customer | Order confirmed, payment success/failure, KYC upload reminder, shipped from China, reached India, out for delivery, delivered, refund processed, wallet credited. |
| Vendor | Registration received, KYC approved/rejected, product change request, product approved/rejected, new order, pickup scheduled, return initiated, subscription expiring/expired. |
| China Team | New China purchase task, availability check pending, purchase SLA breach, QC issue, shipment deadline. |
| Hub User | Incoming carton expected, carton delayed, carton received, package aging breach, courier pickup failed. |
| Admin | High refund request, vendor low rating, expired subscription, compliance warning, feed price increase, duplicate warning, courier exception, KYC pending. |

## 16. Security, Privacy, Audit Logs and KYC Data Handling

Because the platform stores full KYC document image/PDF until the user deletes their account, the system must treat KYC as highly sensitive data. Access should be minimized, encrypted, logged and restricted.

| Control | Requirement | Priority |
| --- | --- | --- |
| Authentication | Strong password policy, OTP/email verification, optional 2FA for admin-sensitive roles. | Must Have |
| RBAC | Permission-level access, especially for KYC, bank details, refunds, settings and exports. | Must Have |
| KYC encryption | Encrypt KYC documents at rest and restrict direct public URL access. Store in private bucket/path. | Must Have |
| Signed URLs | Use short-lived signed URLs for viewing KYC/docs/media not meant for public. | Must Have |
| KYC access log | Log every view/download with user, role, reason, IP, timestamp. | Must Have |
| Data retention | Store KYC until account deletion as business decision. On deletion request, trigger verified deletion/anonymization workflow unless legal hold applies. | Must Have |
| Consent/notice | Show clear notice on why KYC is collected and where it is used before upload. | Must Have |
| Audit logs | Before/after logs for product price, status, refund, vendor bank, KYC, role, settings and order status changes. | Must Have |
| Soft delete | Use soft delete for critical objects; avoid hard delete except privacy deletion workflow. | Must Have |
| Export logs | Record every CSV/export download with filters and user. | Must Have |
| Rate limiting | Admin login, OTP and customer KYC upload endpoints should have rate limits. | Must Have |
| File validation | Validate file type, size, malware scan if possible, image/PDF only for KYC. | Good to Have |

### 16.1 KYC Workflow

Checkout shows two China shipping/import options: cheaper option with KYC, higher option without KYC.

Customer can choose KYC option before payment. Actual upload may happen later from order page/profile KYC section.

Accepted document types should support Aadhaar, PAN, Passport and Voter ID at minimum. Driving License can be added if operations confirms courier/customs partner acceptance.

KYC status: Not Required, Required Pending Upload, Uploaded Pending Review, Approved, Rejected, Resubmission Required, Submitted to Courier/Customs, Expired/Needs Update.

KYC reviewer should see full document only if role permission allows.

Support agents should see KYC status, not full file.

If KYC pending blocks customs/shipping, customer notification should be triggered and admin dashboard should show alert.

KYC upload should have customer notice: purpose, usage, retention until account deletion, access restriction and support contact.

## 17. Suggested MERN Architecture

### 17.1 Recommended Services/Modules

| Layer | Recommendation |
| --- | --- |
| Frontend | React/Next.js admin frontend or React SPA; desktop-first admin. Separate vendor/admin/internal panels can share component library. |
| Backend | Node.js + Express/NestJS style modular API. Use service/repository pattern. |
| Database | MongoDB with well-indexed collections. Use transactions where needed for wallet/order/payment consistency. |
| Queue | BullMQ/Redis or equivalent for daily feed sync, image download/compression, notifications, reports, logistics polling. |
| Storage | DigitalOcean Spaces for product media and private KYC/vendor documents. Use signed URLs for private assets. |
| Search | MongoDB indexes initially; future Elasticsearch/Meilisearch for catalog search if needed. |
| Payments | Gateway-agnostic adapter: Razorpay/Cashfree/PhonePe/PayU/BNPL providers can plug in later. |
| Logistics | Carrier adapter layer: Delhivery, BlueDart, future carriers. |
| Notifications | Provider adapter layer: email, SMS, WhatsApp, push/in-app. |
| Audit | Central audit middleware/service for all sensitive mutations. |

### 17.2 Backend Module Structure

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

### 17.3 Key Technical Rules

Use immutable ledgers for wallet transactions, price history, audit logs and status timelines.

Use soft deletes for products, vendors, orders and documents unless handling customer account deletion request.

Use field-level manual override tracking for China feed products.

Store price/cost snapshots on order item at checkout so later product price changes do not alter old orders.

Use internal status and customer status separately. Do not expose operational language like “Ordered in China” to customers.

Use event-driven updates where possible: order status change triggers notification, dashboard counters, audit log and next task creation.

Use file processing queue for external image download/compression to avoid slow product import requests.

Use private object storage for KYC and vendor bank/document files.

## 18. Suggested Database Entities

The developer may adapt names, but the following entities should exist conceptually. MongoDB collection design should consider indexing by status, source, vendor, order ID, customer ID, created date, updated date and operational queues.

| Entity/Collection | Purpose |
| --- | --- |
| User | Customers and optionally common identity base. |
| AdminUser | Internal admin/employee users. |
| Role | Role name, permissions array, sensitivity level. |
| Vendor | Indian manufacturer vendor profile. |
| VendorDocument | GST/PAN/bank/optional brand/manufacturing proof files. |
| VendorSubscription | Plan, free year, expiry, reminders, admin extension. |
| VendorAccountManager | Assigned internal manager mapping. |
| Category | Category tree and source/category settings. |
| AttributeDefinition | Category-specific attributes. |
| Product | Base product. |
| ProductVariant | Variant/SKU details. |
| ProductImage | Media stored in DigitalOcean Spaces. |
| ProductSource | China feed/vendor/manual source metadata. |
| ProductOverride | Manual field overrides and protection. |
| ProductFeedUpdate | Pending feed changes for approval. |
| ProductCompliance | Legal/compliance declarations and warnings. |
| PriceHistory | Price/cost/margin/exchange rate history. |
| InventoryStock | Vendor live stock or China availability verification. |
| Cart | Customer cart. |
| Order | Parent customer order. |
| OrderItem | Order item with product/price/cost snapshot. |
| FulfillmentGroup | Source/vendor split group. |
| ChinaPurchaseTask | China sourcing task. |
| HubTask | Transit warehouse/hub task. |
| Shipment | International/local shipment. |
| TrackingEvent | Courier/international tracking events. |
| PaymentTransaction | Gateway/BNPL/payment records. |
| Refund | Refund cases and approvals. |
| Wallet | Customer wallet summary. |
| WalletTransaction | Ledger of wallet credit/debit. |
| ReturnRequest | Return or returnless refund request. |
| SupportTicket | CS ticket. |
| Review | Customer/source marketplace product reviews. |
| VendorRatingSnapshot | Rating calculation snapshots. |
| Invoice | Customer invoice and supplier invoice references. |
| PayoutSettlement | Vendor payout reports. |
| ExchangeRate | Daily rate, 3-day average, source, manual override. |
| PricingRule | Global/category/product pricing formula components. |
| ShippingRule | Courier/serviceability/weight/location rules. |
| CMSContent | Banners, collections, pages. |
| CouponCampaign | Coupons and marketing campaign rules. |
| NotificationLog | Email/SMS/WhatsApp/in-app sent logs. |
| AuditLog | Sensitive action log. |
| SystemSetting | Global settings. |
| ExportLog | CSV/accounting/report export log. |
| KycDocument | Customer import KYC document storage metadata. |

### 18.1 Critical Indexes

products: sourceType, status, categoryId, vendorId, sourceProductId, slug, createdAt, updatedAt, complianceStatus, lastSyncAt, lastVerifiedAt.

orders: orderNumber, customerId, status, paymentStatus, sourceMix, createdAt, deliveryPincode.

orderItems: orderId, productId, vendorId, sourceType, internalStatus, customerStatus.

chinaPurchaseTasks: status, priority, createdAt, dueAt, sourceProductId, assignedTo.

hubTasks: status, cartonId, receivedAt, dueAt, assignedTo.

vendors: status, subscriptionStatus, accountManagerId, rating, city, categoryIds.

supportTickets: status, priority, assignedTo, orderId, category, createdAt.

auditLogs: actorId, entityType, entityId, action, createdAt.

walletTransactions: customerId, orderId, type, createdAt.

## 19. API Endpoint Map

This section is not final API design, but gives the developer module boundaries and expected operations.

| Module | Example Endpoints |
| --- | --- |
| Auth/RBAC | POST /admin/auth/login, POST /admin/users, PATCH /admin/users/:id, GET /admin/roles, POST /admin/roles, PATCH /admin/roles/:id |
| Products | GET /admin/products, GET /admin/products/:id, PATCH /admin/products/:id, POST /admin/products/:id/approve, POST /admin/products/:id/reject, POST /admin/products/bulk-action |
| Feed Updates | GET /admin/feed-updates, GET /admin/products/:id/feed-updates, POST /admin/feed-updates/:id/apply, POST /admin/feed-updates/:id/ignore |
| Pricing | GET /admin/pricing-rules, POST /admin/pricing-rules, PATCH /admin/pricing-rules/:id, GET /admin/exchange-rates, POST /admin/exchange-rates/override |
| Vendors | GET /admin/vendors, GET /admin/vendors/:id, PATCH /admin/vendors/:id/status, POST /admin/vendors/:id/assign-manager, PATCH /admin/vendors/:id/subscription |
| Orders | GET /admin/orders, GET /admin/orders/:id, PATCH /admin/orders/:id/status, POST /admin/orders/:id/cancel, POST /admin/orders/:id/internal-note |
| China Ops | GET /china/tasks, GET /china/tasks/:id, PATCH /china/tasks/:id/status, POST /china/tasks/:id/purchase, POST /china/tasks/:id/qc, POST /china/cartons |
| Hub Ops | GET /hub/inbound-cartons, POST /hub/cartons/:id/receive, POST /hub/tasks/:id/qc, POST /hub/tasks/:id/create-local-shipment, POST /hub/tasks/:id/handover |
| Logistics | GET /admin/shipments, POST /admin/shipments, POST /admin/shipments/:id/track, POST /admin/shipments/:id/cancel, POST /admin/shipments/:id/retry |
| Returns/Refunds | GET /admin/refunds, POST /admin/refunds, PATCH /admin/refunds/:id/approve, PATCH /admin/refunds/:id/reject, POST /admin/returns |
| Wallet | GET /admin/wallets/:customerId, POST /admin/wallets/:customerId/adjustment, GET /admin/wallet-transactions |
| Support | GET /admin/tickets, POST /admin/tickets, PATCH /admin/tickets/:id, POST /admin/tickets/:id/internal-note |
| Vendor Panel | GET /vendor/dashboard, PATCH /vendor/profile, POST /vendor/documents, GET /vendor/products, POST /vendor/products, POST /vendor/products/import-csv, GET /vendor/orders, PATCH /vendor/orders/:id/status |
| Reports | GET /admin/reports/sales, GET /admin/reports/profit, GET /admin/reports/vendors, GET /admin/reports/china-ops, POST /admin/exports/tally-csv |

## 20. Phase-wise Delivery Plan

| Phase | Scope |
| --- | --- |
| Phase 1 - Launch Must Have | Admin auth/RBAC, vendor onboarding, product management, China Product Feed view/override, daily sync update review, category/attribute, pricing engine, exchange rate, order split, China team panel, hub panel, vendor panel, logistics adapters, wallet/refund, support tickets, finance CSV, audit logs, DigitalOcean media, basic reports. |
| Phase 1.5 - Stabilization | Advanced dashboards, vendor rating public display, returnless refund automation, hub SLA reporting, vendor subscription reminders/expiry automation, more CSV templates, marketing CMS/coupons, duplicate image detection improvements. |
| Phase 2 - Growth | Direct payment gateway/BNPL provider integrations, advanced search, customer review photo moderation, campaign analytics, product recommendation rules, courier optimization, profitability forecasting, direct Zoho/Tally integration if needed. |
| Future | Mobile app, app push notifications, advanced AI product enrichment at scale, direct vendor marketplace API imports if business obtains API access, automated compliance category classification, advanced WMS if long-term inventory is introduced. |

## 21. Acceptance Criteria and QA Checklist

| Area | Acceptance Criteria |
| --- | --- |
| RBAC | A user without KYC permission cannot view/download KYC documents. Sensitive actions are audit logged. |
| Product overwrite | If admin overwrites China product title/price/images/description, daily sync does not overwrite it automatically. Pending updates are shown for approval. |
| Duplicate warning | System warns for same source ID/URL or similar image/title duplicate. |
| Indian product compliance | Indian vendor product cannot be approved without mandatory legal metrology fields. |
| China compliance warning | Risky China product shows warning but is not auto-unpublished unless admin manually changes status. |
| Pricing | China product selling price uses configured formula, exchange rate average, margin and rounding. Product-level override works. |
| Exchange rate | 3-day average is recorded; manual override has reason and audit log. |
| Mixed cart | Order splits internally by source/vendor and creates correct fulfillment groups. |
| China cancellation | Customer can cancel before China Purchase Completed; after that, cancellation is blocked except admin exception. |
| Customer status | Customer never sees “Ordered in China”; sees Shipping in Process, Shipped from China, In Transit, Reached India, etc. |
| China team privacy | China user sees sourcing/product data only, not customer identity/KYC. |
| Hub workflow | Hub user can receive, QC, split, create local shipment and handover courier, but cannot change refund/payment/product price. |
| Vendor subscription expiry | After first-year/free period expiry, vendor products are unpublished unless admin extends free period. |
| Vendor CSV import | CSV upload supports mapping, preview, errors and imports products as pending approval. |
| Refund wallet | Wallet refund creates ledger transaction and links to order/refund/ticket. |
| Bank refund request | CS/Finance can record deduction fee and refund status. |
| Logistics | System auto-assigns Delhivery/BlueDart by rules and supports manual override with reason. |
| Reports | Admin can export Tally/Zoho-compatible CSV for accounting. |
| Audit | Critical before/after values are stored for product price/status, refund, role, KYC and vendor bank access. |

## 22. Compliance References for Developer Awareness

The developer does not need to interpret law, but the system should provide fields, workflows and controls that allow the business/legal/finance team to comply. Final compliance must be validated by qualified legal/tax/customs professionals.

| Reference Area | Why It Matters |
| --- | --- |
| Consumer Protection (E-Commerce) Rules, 2020 | Marketplace/entity duties, grievance redressal, seller/importer information and consumer-facing disclosures should be considered in platform design. Official source: Department of Consumer Affairs / Gazette. |
| Legal Metrology (Packaged Commodities) Rules, 2011 | E-commerce product pages should be designed to store/display declarations such as manufacturer/packer/importer, MRP, country of origin, generic name, net quantity, month/year and consumer care details where applicable. |
| BIS compulsory certification lists | The product compliance warning engine should help flag categories/products that may require Indian standards/certification. |
| CBIC courier import KYC circular/FAQs | Courier imports for individuals may require KYC documents such as Aadhaar, Passport, PAN or Voter ID depending on identity/address requirements and courier/customs process. |
| Digital Personal Data Protection Act, 2023 | KYC and personal data handling should support notice, purpose limitation, consent/legal basis, security safeguards, access control, audit logs and deletion workflows. |

## Appendix A - Priority Summary

Must Have: All core admin modules, vendor panel, China team panel, hub panel, order split, pricing engine, exchange rates, wallet/refunds, support tickets, logistics, accounting CSV, audit logs and KYC security.

Good to Have: Advanced marketing CMS, campaign analytics, file malware scan, advanced search, vendor support workflow improvements, public rating refinements.

Future: Mobile app, direct marketplace API imports, direct Tally/Zoho integration, advanced AI automation, advanced WMS if long-term inventory begins.

## Appendix B - Developer Notes

Do not hardcode business rules that admin should control. Pricing, shipping, exchange rate, cancellation threshold, refund fee, vendor subscription, category warnings and courier assignment must be configurable.

Avoid irreversible deletes. Use soft deletes and audit logs.

Design all operations as timelines/events. This is important for support, disputes, customs delays, vendor disputes and finance reconciliation.

Keep customer-facing statuses separate from internal statuses.

Keep KYC access strictly permission-controlled and log every access.

Build source abstraction early: China Product Feed, Indian Vendor, Manual Admin Product. This will prevent messy product/order code later.

Use adapters for payment gateways, logistics, notifications and exchange rate providers so integrations can change without rewriting business logic.
