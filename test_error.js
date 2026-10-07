async function test() {
  const res = await fetch('https://www.dholeraplatform.com/blogs/188-ahmedabad-metro-phase-3-pib-clearance-boosting-connectivity-to-dholera-smart-city');
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response text length:", text.length);
  if (res.status >= 500) {
    console.log(text.slice(0, 1000));
  }
}
test();
