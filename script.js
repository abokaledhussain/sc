// قائمة العملات
const currencies = {
"USD": "الدولار الأمريكي",
  "EUR": "اليورو",
  "GBP": "الجنيه الإسترليني",
  "JPY": "الين الياباني",
  "AUD": "الدولار الأسترالي",
  "CAD": "الدولار الكندي",
  "CHF": "الفرنك السويسري",
  "NZD": "الدولار النيوزيلندي",
  "SGD": "الدولار السنغافوري",
  "HKD": "الدولار الهونغ كونغي",
  "SEK": "الكرونا السويدية",
  "NOK": "الكرون النرويجي",
  "DKK": "الكرون الدنماركي",
  "SAR": "الريال السعودي",
  "KWD": "الدينار الكويتي",
  "BHD": "الدينار البحريني",
  "JOD": "الدينار الأردني",
  "AED": "الدرهم الإماراتي",
  "IQD": "الدينار العراقي",
  "TRY": "الليرة التركية",
  "RUB": "الروبل الروسي",
  "QAR": "الريال القطري",
  "EGP": "الجنيه المصري",
  "ALL": "الليك الألباني",
  "BAM": "المارك البوسني والهرسكي",
  "EUR": "اليورو (كوسوفو)",
  "KGS": "السوم القرقيزستاني",
  "GEL": "اللاري الجورجي",
  "AZN": "المانات الأذربيجاني",
  "IDR": "الروبية الإندونيسية"    // إضافة المزيد من العملات هنا
};

// إنشاء خيارات العملات
function createCurrencyOptions() {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const searchFromInput = document.getElementById('searchFrom').value.toLowerCase();
    const searchToInput = document.getElementById('searchTo').value.toLowerCase();

    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';

    Object.entries(currencies).forEach(([code, name]) => {
        if (name.toLowerCase().includes(searchFromInput)) {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${name} (${code})`;
            fromCurrencySelect.appendChild(option.cloneNode(true));
        }

        if (name.toLowerCase().includes(searchToInput)) {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${name} (${code})`;
            toCurrencySelect.appendChild(option);
        }
    });
}

// استدعاء الدالة عند تحميل الصفحة
window.onload = createCurrencyOptions;

// دالة تحويل العملات
function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = amount * exchangeRate;
            document.getElementById('result').innerText = `${amount} ${currencies[fromCurrency]} = ${convertedAmount.toFixed(2)} ${currencies[toCurrency]}`;
        })
        .catch(error => console.log('Error:', error));
}

// استدعاء الدالة عند تغيير حقل البحث (من)
document.getElementById('searchFrom').addEventListener('input', createCurrencyOptions);

// استدعاء الدالة عند تغيير حقل البحث (إلى)
document.getElementById('searchTo').addEventListener('input', createCurrencyOptions);