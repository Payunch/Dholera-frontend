async function test() {
  const res = await fetch('https://api.dholeraplatform.com/api/updates');
  const data = await res.json();
  const arr = Array.isArray(data) ? data : data.data;
  const p = arr.find(x => x.slug === 'dholera-plot-registration-process');
  if (p) {
    console.log(Object.keys(p));
    console.log("seoTitle:", p.seoTitle);
    console.log("title:", p.title);
  } else {
    console.log("Post not found in API response");
  }
}
test();
