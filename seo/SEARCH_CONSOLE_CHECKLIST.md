# Search Console and GA4 release checklist

Run after the commit is deployed to production.

## Search Console

1. Verify the Domain property `dholeraplatform.com` using the DNS TXT record supplied by Google.
2. Add or select the URL-prefix property `https://www.dholeraplatform.com/`.
3. Submit `https://www.dholeraplatform.com/sitemap.xml` under **Indexing → Sitemaps**.
4. Inspect `/`, `/tp-maps`, `/investment-guide`, `/infrastructure`, `/airport`, `/blogs`, `/author/naresh-gohel`, and `/editorial-policy`.
5. Confirm **User-declared canonical** and **Google-selected canonical** both use `https://www.dholeraplatform.com`.
6. Request indexing only after each inspected page passes the live test.
7. Export Page indexing exclusions and investigate server errors, blocked pages, duplicate canonicals, and crawled/discovered-not-indexed priority pages.
8. Review results every 28 days. Improve pages with relevant queries in average positions 8–30 before creating unrelated content.

## GA4/GTM

Mark these emitted events as key events where they represent qualified intent:

- `whatsapp_click`
- `phone_click`
- `email_click`
- `download_click`
- existing validated lead/contact submission events

Test events in GTM Preview and GA4 DebugView. Do not mark ordinary page views or low-intent interactions as conversions.

## Release verification

- `/robots.txt` and `/sitemap.xml` return 200.
- `/investment`, `/privacy`, and `/terms` return 308 to their preferred destinations.
- A nonexistent URL returns 404.
- No priority page shows translation keys, placeholder contact data, or broken encoding.
