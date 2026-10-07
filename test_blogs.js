async function test() {
  const res = await fetch('https://www.dholeraplatform.com/blogs', {
    headers: { 'Cache-Control': 'no-cache' }
  });
  const html = await res.text();
  console.log("Found 163?", html.includes('/blogs/163-why-dholera-sir-is-the-ultimate-investment-destination-in-2026'));
  console.log("Found 158?", html.includes('/blogs/158-why-dholera-smart-city-is-the-ultimate-real-estate-investment-in-2026'));
}
test();
