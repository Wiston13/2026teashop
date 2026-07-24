const SCRIPT_URL = ""; // Paste your deployed Apps Script web-app URL here.

const drinks = [
  { category: "珍珠奶茶", name: "珍珠奶茶", prices: { "冰 S": 100, "冰 M": 190, "熱 S": 115, "熱 M": 220 } },
  { category: "珍珠奶茶", name: "頂級烏瓦紅茶凍飲", prices: { "冰 S": 85, "冰 M": 160, "熱 S": 100, "熱 M": 190 } },
  { category: "特別推薦", name: "翡翠百香綠茶", prices: { "冰 S": 120, "冰 M": 230 } },
  { category: "夏限定", name: "四季春冰茶", prices: { "冰 S": 90, "冰 M": 170 } },
  { category: "夏限定", name: "四季春紅柚蜜茶", prices: { "冰 S": 130, "冰 M": 250 } },
  { category: "夏限定", name: "紅心芭樂檸檬綠茶", prices: { "冰 S": 135, "冰 M": 260 } },
  { category: "茶加鮮奶", name: "紅茶拿鐵", prices: { "冰 S": 115, "冰 M": 220, "熱 S": 125, "熱 M": 240 } },
  { category: "茶加鮮奶", name: "鐵觀音拿鐵", prices: { "冰 S": 115, "冰 M": 220, "熱 S": 125, "熱 M": 240 } },
  { category: "茶加鮮奶", name: "黑糖琥珀珍珠拿鐵", prices: { "冰 S": 130, "冰 M": 250 } },
  { category: "醇奶茶", name: "香醇奶茶", prices: { "冰 S": 95, "冰 M": 180, "熱 S": 110, "熱 M": 210 } },
  { category: "醇奶茶", name: "胚芽奶茶", prices: { "冰 S": 100, "冰 M": 190, "熱 S": 115, "熱 M": 220 } },
  { category: "醇奶茶", name: "茉香奶茶", prices: { "冰 S": 95, "冰 M": 180, "熱 S": 110, "熱 M": 210 } },
  { category: "醇奶茶", name: "茉奶珍珠", prices: { "冰 S": 100, "冰 M": 190, "熱 S": 115, "熱 M": 220 } },
  { category: "醇奶茶", name: "鐵觀音奶茶", prices: { "冰 S": 95, "冰 M": 180, "熱 S": 110, "熱 M": 210 } },
  { category: "醇奶茶", name: "觀音珍珠奶茶", prices: { "冰 S": 100, "冰 M": 190, "熱 S": 115, "熱 M": 220 } },
  { category: "純粹茶", name: "鐵觀音凍飲", prices: { "冰 S": 85, "冰 M": 160 } },
  { category: "純粹茶", name: "翡翠綠茶凍飲", prices: { "冰 S": 90, "冰 M": 170 } },
  { category: "調和茶", name: "珍珠紅茶", prices: { "冰 S": 90, "冰 M": 170 } },
  { category: "調和茶", name: "珍珠翡翠綠茶", prices: { "冰 S": 90, "冰 M": 170 } },
  { category: "調和茶", name: "冰梅凍飲", prices: { "冰 S": 95, "冰 M": 180, "熱 S": 110, "熱 M": 210 } },
  { category: "調和茶", name: "蜂蜜翡翠綠茶", prices: { "冰 S": 95, "冰 M": 180 } },
  { category: "調和茶", name: "翡翠檸檬綠茶", prices: { "冰 S": 110, "冰 M": 210 } },
  { category: "無茶類", name: "檸檬蜜凍飲", prices: { "冰 S": 105, "冰 M": 200 } },
  { category: "無茶類", name: "檸檬蘆薈凍飲", prices: { "冰 S": 110, "冰 M": 210 } },
  { category: "無茶類", name: "蜂蜜拿鐵", prices: { "冰 S": 115, "冰 M": 220, "熱 S": 125, "熱 M": 240 } },
  { category: "文人茶（熱飲）", name: "萬壽菊", prices: { "熱 M": 220 } }, { category: "文人茶（熱飲）", name: "白毫烏龍菊", prices: { "熱 M": 220 } }, { category: "文人茶（熱飲）", name: "金萱萬壽菊", prices: { "熱 M": 220 } }, { category: "文人茶（熱飲）", name: "高山金萱", prices: { "熱 M": 220 } }, { category: "文人茶（熱飲）", name: "高山焙火烏龍", prices: { "熱 M": 220 } }, { category: "文人茶（熱飲）", name: "白毫烏龍", prices: { "熱 M": 220 } }, { category: "文人茶（熱飲）", name: "文山包種茶", prices: { "熱 M": 220 } }
];
const $ = (id) => document.getElementById(id);
const category = $("category"), drink = $("drink"), temperature = $("temperature"), size = $("size");
const categories = [...new Set(drinks.map(d => d.category))];
category.innerHTML = categories.map(x => `<option>${x}</option>`).join("");
function currentDrink(){ return drinks.find(d => d.category === category.value && d.name === drink.value); }
function updateDrinks(){ const rows=drinks.filter(d=>d.category===category.value); drink.innerHTML=rows.map(d=>`<option>${d.name}</option>`).join(""); updateSpecs(); }
function updateSpecs(){ const item=currentDrink(); const keys=Object.keys(item.prices); const temps=[...new Set(keys.map(k=>k.split(" ")[0]))]; temperature.innerHTML=temps.map(x=>`<option>${x}</option>`).join(""); updateSizes(); }
function updateSizes(){ const item=currentDrink(); const temp=temperature.value; const keys=Object.keys(item.prices).filter(k=>k.startsWith(temp+" ")); size.innerHTML=keys.map(k=>`<option value="${k.split(" ")[1]}">${k.split(" ")[1]}</option>`).join(""); updatePrice(); }
function updatePrice(){ const item=currentDrink(); const key=`${temperature.value} ${size.value}`; const price=item.prices[key] || 0; $("summary-drink").textContent=item.name; $("summary-spec").textContent=`${temperature.value}飲 · ${size.value}杯`; $("total-price").textContent=`$${price}`; }
category.addEventListener("change",updateDrinks); drink.addEventListener("change",updateSpecs); temperature.addEventListener("change",updateSizes); size.addEventListener("change",updatePrice); updateDrinks();
$("order-form").addEventListener("submit", async (event) => { event.preventDefault(); const message=$("form-message"), button=$("submit-button"), item=currentDrink(); const data={name:$("name").value.trim(),category:category.value,drink:item.name,temperature:temperature.value,size:size.value,sugar:$("sugar").value,ice:$("ice").value,note:$("note").value.trim(),price:item.prices[`${temperature.value} ${size.value}`]}; if(!data.name) return; if(!SCRIPT_URL){message.textContent="尚未設定 Google Apps Script 網址，請依 README 完成部署。";return;} button.disabled=true; message.textContent="正在送出…"; try { await fetch(SCRIPT_URL,{method:"POST",mode:"no-cors",body:JSON.stringify(data)}); message.textContent="訂單已送出，謝謝！"; event.target.reset(); updateDrinks(); } catch(err) { message.textContent="送出失敗，請稍後再試。"; } finally { button.disabled=false; } });
