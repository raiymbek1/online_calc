import React, { useState } from "react";
import "./App.css";
import CustomSelect from "./CustomSelect";
import logo from "./logo.png"; // путь к твоему логотипу


export default function Calculator() {
  const [risk, setRisk] = useState(""); 
  const [ved, setVed] = useState(""); 
  const [subVed, setSubVed] = useState(""); 
  const [pok, setPok] = useState(""); 
  const [f, setF] = useState(""); 
  const [result, setResult] = useState(""); 
  const [workTime, setWorkTime] = useState(""); 
  const [minStandard, setMinStandard] = useState(""); 
  const [isError, setIsError] = useState(false); 
  const [showResult, setShowResult] = useState(false); // блок видимости результата
  const [loading, setLoading] = useState(false);
  const [pokError, setPokError] = useState("");
  const [additionalLeave, setAdditionalLeave] = useState("");

  const vedOptions = {
    "Сельское, лесное и рыбное хозяйство": {
      _value: 1.037,
      details: {
        "Растениеводство и животноводство, охота и услуги": 1.038,
        "Лесоводство и лесозаготовки": 1.021,
        "Рыболовство и рыбоводство": 1.04,
      },
    },
    "Промышленность": {
      _value: 1.082,
      details: {
        "Горнодобывающая промышленность и разработка карьеров": 1.073,
        "Добыча угля": 1.095,
        "Добыча сырой нефти и природного газа": 1.036,
        "Добыча металлических руд": 1.128,
        "Добыча прочих полезных ископаемых": 1.091,
        "Предоставление услуг в горнодобывающей промышленности": 1.04,
      },
    },
    "Обрабатывающая промышленность": {
      _value: 1.09,
      details: {
        "Производство продуктов питания": 1.022,
        "Производство напитков": 1.066,
        "Производство табачных изделий": 1.112,
        "Производство текстильных изделий": 1.042,
        "Производство кожаной продукции": 1.023,
        "Производство бумаги и бумажной продукции": 1.059,
        "Производство кокса и нефтепродуктов": 1.065,
        "Производство химической продукции": 1.14,
        "Фармацевтические препараты": 1.037,
        "Производство резиновых и пластмассовых изделий": 1.03,
        "Производство минеральной продукции": 1.039,
        "Металлургическое производство": 1.099,
        "Производство металлических изделий": 1.045,
        "Производство электрического оборудования": 1.042,
        "Производство машин и оборудования": 1.05,
        "Производство автомобилей, прицепов": 1.042,
        "Производство прочих транспортных средств": 1.043,
        "Ремонт и установка оборудования": 1.053,
      },
    },
    "Снабжение электроэнергией, газом, паром, горячей водой и кондиционированным воздухом": 1.043,
    "Водоснабжение; сбор, обработка и удаление отходов, деятельность по ликвидации загрязнений": 1.063,
    "Строительство": 1.088,
    "Транспорт и складирование": {
      _value: 1.053,
      details: {
        "Сухопутный и трубопроводный транспорт": 1.054,
        "Водный транспорт": 1.105,
        "Воздушный транспорт": 1.052,
        "Складирование и вспомогательная деятельность": 1.046,
      },
    },
    "Информация и связь": {
      _value: 1.016,
      details: {
        "Телекоммуникации": 1.018,
        "Информационное обслуживание": 1.024,
      },
    },
    "Профессиональная, научная и техническая деятельность": {
      _value: 1.07,
      details: {
        "Архитектура, инженерные изыскания": 1.063,
        "Ветеринарная деятельность": 1.184,
      },
    },
    "Здравоохранение и социальное обслуживание": 1.081,
  };

  const riskOptions = ["1 — допустимый", "2 — низкий", "3 — средний", "4 — высокий", "5 — очень высокий"];

  const handleCalculate = () => {
  if (!risk || !ved || !pok || !f) {
    setResult("Заполните все поля");
    setWorkTime("");
    setMinStandard("");
    setIsError(true);
    setShowResult(true);
    return;
  }
 const A = parseInt(risk, 10); // <- сначала определяем A
  let leaveText = "";

switch (A) {
  case 1:
    leaveText = "Дополнительный отпуск не предоставляется.";
    break;
  case 2:
    leaveText = "Дополнительный отпуск предоставляется от 6 до 12 дней.";
    break;
  case 3:
    leaveText = "Дополнительный отпуск предоставляется от 18 до 24 дней.";
    break;
  case 4:
    leaveText = "Дополнительный отпуск предоставляется от 30 до 36 дней.";
    break;
  case 5:
    leaveText = "Дополнительный отпуск предоставляется в 36 дней.";
    break;
  default:
    leaveText = "";
}

setAdditionalLeave(leaveText);

  const D2 = parseFloat(pok);
if (D2 < 0 || D2 > 10) {
  setResult("Проверьте значения ПОК");
  setWorkTime("");
  setMinStandard("");
  setIsError(true);
  setShowResult(true);
   return;
} else {
  setPokError(""); // скрыть подсказку, если всё верно
}
  setLoading(true);      // показать загрузку
  setShowResult(false);  // скрыть старый результат

  setTimeout(() => {
    // расчёт
    let D1 = null;
    const vedData = vedOptions[ved];
    if (typeof vedData === "number") {
      D1 = vedData;
    } else if (vedData.details && subVed) {
      D1 = vedData.details[subVed];
    } else {
      D1 = vedData._value;
    }

    const A = parseInt(risk, 10);
    const D2 = parseFloat(pok);
    const F = parseFloat(f);

    const K = ((1 + ((A - 1) / 3) * (D1 - 1)) * D2) / D1;
    setResult(`Коэффициент оплаты труда по ВЭД = ${K.toFixed(3)}`);

    const minStd = F * K;
    setMinStandard(`Минимальный стандарт оплаты труда = ${minStd.toFixed(2)}`);

    if (A > 2) {
      setWorkTime("Продолжительность рабочего времени в неделю сокращается до 36 часов.");
    } else {
      setWorkTime("Сокращенное рабочее время не предоставляется.");
    }

    setIsError(false);
    setShowResult(true);
    setLoading(false);  // скрыть загрузку
  }, 300); // имитация задержки
};

  const handleReset = () => {
    setRisk("");
    setVed("");
    setSubVed("");
    setPok("");
    setF("");
    setResult("");
    setWorkTime("");
    setMinStandard("");
    setIsError(false);
    setShowResult(false);
  };

  return (
    <div className="calculator">
      <div className="logo-wrapper">
        <img src={logo} alt="Логотип" className="logo" />
      </div>
      <h1>Онлайн-калькулятор расчета объема гарантий</h1>

      <div className="form-group">
  <label>Степень профессионального риска:</label>
  <CustomSelect
  options={riskOptions}
  value={risk}
  onChange={(val) => setRisk(val)}
  placeholder="Выберите риск"
  className={isError && !risk ? "input-error-border" : ""}
/>
</div>

<div className="form-group">
  <label>Вид экономической деятельности (ВЭД):</label>
  <CustomSelect
  options={Object.keys(vedOptions)}
  value={ved}
  onChange={(val) => { setVed(val); setSubVed(""); }}
  placeholder="Выберите ВЭД"
  className={isError && !ved ? "input-error-border" : ""}
/>
</div>

{ved && vedOptions[ved].details && (
  <div className="form-group">
    <label>Детализация ВЭД:</label>
    <CustomSelect
    options={Object.keys(vedOptions[ved].details)}
    value={subVed}
    onChange={(val) => setSubVed(val)}
    placeholder="Выберите детализацию"
    className={isError && !subVed ? "input-error-border" : ""}
/>
  </div>
)}

      <div className="form-group">
        <label>Повышающий отраслевой коэффициент (ПОК):</label>
        <input
  type="number"
  step="0.001"
  min="0"
  max="10"
  value={pok}
  onChange={(e) => setPok(e.target.value)}
  placeholder="Введите значение"
className={isError && (!pok || pok < 0 || pok > 10) ? "input-error-border" : ""}
/>
        {pokError && <div className="input-error">{pokError}</div>}
      </div>

      <div className="form-group">
        <label>Минимальная зарплата первого разряда:</label>
        <input
  type="number"
  value={f}
  onChange={(e) => setF(e.target.value)}
  placeholder="Введите значение"
  className={isError && !f ? "input-error-border" : ""}
/>
      </div>

      <div className="button-group">
        <button onClick={handleCalculate}>Рассчитать</button>
        <button onClick={handleReset}>Сбросить</button>
      </div>

      {loading && <div className="loader-wrapper"><div className="loader"></div></div>}

      {showResult && !loading && (
         <div className={`result ${isError ? "error" : "success"} show`}>
    <h2>Результаты расчета</h2>
    {result && <p>{result}</p>}
    {minStandard && <p>{minStandard}</p>}
    {workTime && <p>{workTime}</p>}
    {additionalLeave && <p>{additionalLeave}</p>}
        </div>
      )}
    </div>
  );
}