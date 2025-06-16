const formulasPorTema = {
  cinematica: [
    { id: "velocidad", nombre: "Velocidad (v = e/t)" },
    { id: "aceleracion", nombre: "Aceleración (a = v/t)" },
    { id: "espacioAcel", nombre: "Espacio (e = v₀·t + at²)" },
    { id: "mruv", nombre: "Velocidad final (v = v₀ + at)" },
  ],
  dinamica: [
    { id: "masa", nombre: "Masa (m = P/g)" },
    { id: "fuerza", nombre: "Fuerza (F = m·a)" },
  ],
  energia: [{ id: "energia", nombre: "Energía cinética (Ec = ½·m·v²)" }],
  calorimetria: [
    { id: "calor", nombre: "Calor (Q = m·c·ΔT)" },
    { id: "calorLatente", nombre: "Calor Latente (Q = m·L)" },
  ],
  electrostatica: [
    { id: "coulomb", nombre: "Ley de Coulomb (F = k·|q₁·q₂| / d²)" },
    { id: "campo", nombre: "Campo eléctrico (E = k·|q| / d²)" },
    { id: "fuerza_campo", nombre: "Fuerza sobre una carga (F = q·E)" },
  ],
};

function cargarFormulas() {
  const tema = document.getElementById("tema").value;
  const formulaSelect = document.getElementById("formula");
  const contenedor = document.getElementById("formulas-container");

  formulaSelect.innerHTML = "";
  if (!tema) {
    contenedor.style.display = "none";
    document.getElementById("formulario").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    return;
  }

  formulasPorTema[tema].forEach((formula) => {
    const option = document.createElement("option");
    option.value = formula.id;
    option.textContent = formula.nombre;
    formulaSelect.appendChild(option);
  });

  contenedor.style.display = "block";
  mostrarCampos(); // Muestra la primera fórmula por defecto
}

function mostrarCampos() {
  const formula = document.getElementById("formula").value;
  const formulario = document.getElementById("formulario");
  let html = "";

  //    --- Cinematica ---
  if (formula === "velocidad") {
    html += `
            <p>$v = \\frac{e}{t}$</p>
            <label>e (m): <input type="number" id="e"></label>
            <label>t (s): <input type="number" id="t"></label>
        `;
  } else if (formula === "aceleracion") {
    html += `
            <p>$a = \\frac{v}{t}$</p>
            <label>v (m/s): <input type="number" id="v"></label>
            <label>t (s): <input type="number" id="t"></label>
        `;
  } else if (formula === "espacioAcel") {
    html += `
            <p>$e = v_0 \\cdot t + at^2$</p>
            <label>v₀ (m/s): <input type="number" id="v0"></label>
            <label>t (s): <input type="number" id="t"></label>
            <label>a (m/s²): <input type="number" id="a"></label>
        `;
  } else if (formula === "mruv") {
    html += `
            <p>$v = v_0 + a \\cdot t$</p>
            <label>v₀ (m/s): <input type="number" id="v0"></label>
            <label>a (m/s²): <input type="number" id="a"></label>
            <label>t (s): <input type="number" id="t"></label>
        `;

    //    --- Dinamica ---
  } else if (formula === "masa") {
    html += `
            <p>$m = \\frac{P}{g}$</p>
            <label>P (kg): <input type="number" id="P"></label>
            <label>g (m/s²): <input type="number" id="g"></label>
        `;
  } else if (formula === "fuerza") {
    html += `
            <p>$F = m \\cdot a$</p>
            <label>m (kg): <input type="number" id="m"></label>
            <label>a (m/s²): <input type="number" id="a"></label>
        `;

    //    --- Trabajo Y Energia ---
  } else if (formula === "energia") {
    html += `
            <p>$E_c = \\frac{1}{2} m \\cdot v^2$</p>
            <label>m (kg): <input type="number" id="m"></label>
            <label>v (m/s): <input type="number" id="v"></label>
        `;

    //    --- Calorimetria ---
  } else if (formula === "calor") {
    html += `
            <p>$Q = m \\cdot c \\cdot \\Delta T$</p>
            <label>m (kg): <input type="number" id="m"></label>
            <label>c (J/kg ºC): <input type="number" id="c"></label>
            <label>ΔT (ºC): <input type="number" id="T"></label>
        `;
  } else if (formula === "calorLatente") {
    html += `
            <p>$Q = m \\cdot L$</p>
            <label>m (kg): <input type="number" id="m"></label>
            <label>L (J/kg): <input type="number" id="L"></label>
        `;
    //    --- Electrostatica ---
  } else if (formula === "coulomb") {
    html += `
          <p>$F = k \\cdot \\frac{|q_1 \\cdot q_2|}{d^2}$</p>
          <label>q1 (C): <input type="number" id="q1"></label>
          <label>q2 (C): <input type="number" id="q2"></label>
          <label>d (m): <input type="number" id="d"></label>
      `;
  } else if (formula === "campo") {
    html += `
          <p>$E = k \\cdot \\frac{|q|}{d^2}$</p>
          <label>q (C): <input type="number" id="q"></label>
          <label>d (m): <input type="number" id="d"></label>
      `;
  } else if (formula === "fuerza_campo") {
    html += `
          <p>$F = q \\cdot E$</p>
          <label>q (C): <input type="number" id="q"></label>
          <label>E (m): <input type="number" id="E"></label>
      `;
  }
  formulario.innerHTML = html;
  document.getElementById("resultado").innerHTML = "";

  if (window.MathJax) {
    MathJax.typeset();
  }
}

function calcular() {
  const formula = document.getElementById("formula").value;
  let resultado = "";

  //    --- Cinematica ---
  if (formula === "velocidad") {
    const e = parseFloat(document.getElementById("e").value);
    const t = parseFloat(document.getElementById("t").value);
    if (isNaN(e) || isNaN(t)) {
      resultado = "Completá todos los campos.";
    } else {
      const v = e / t;
      resultado = `v = ${v.toFixed(2)} m/s`;
    }
  } else if (formula === "aceleracion") {
    const v = parseFloat(document.getElementById("v").value);
    const t = parseFloat(document.getElementById("t").value);
    if (isNaN(v) || isNaN(t)) {
      resultado = "Completá todos los campos.";
    } else {
      const a = v / t;
      resultado = `a = ${a.toFixed(2)} m/s²`;
    }
  } else if (formula === "espacioAcel") {
    const v0 = parseFloat(document.getElementById("v0").value);
    const a = parseFloat(document.getElementById("a").value);
    const t = parseFloat(document.getElementById("t").value);
    if (isNaN(v0) || isNaN(a) || isNaN(t)) {
      resultado = "Completá todos los campos.";
    } else {
      const e = v0 * t + a * t ** 2;
      resultado = `e = ${e.toFixed(2)} m`;
    }
  } else if (formula === "mruv") {
    const v0 = parseFloat(document.getElementById("v0").value);
    const a = parseFloat(document.getElementById("a").value);
    const t = parseFloat(document.getElementById("t").value);
    if (isNaN(v0) || isNaN(a) || isNaN(t)) {
      resultado = "Completá todos los campos.";
    } else {
      const v = v0 + a * t;
      resultado = `v = ${v.toFixed(2)} m/s`;
    }

    //    --- Dinamica ---
  } else if (formula === "masa") {
    const p = parseFloat(document.getElementById("P").value);
    const g = parseFloat(document.getElementById("g").value);
    if (isNaN(p) || isNaN(g)) {
      resultado = "Completá todos los campos.";
    } else {
      const m = p / g;
      resultado = `m = ${m.toFixed(2)} N`;
    }
  } else if (formula === "fuerza") {
    const m = parseFloat(document.getElementById("m").value);
    const a = parseFloat(document.getElementById("a").value);
    if (isNaN(m) || isNaN(a)) {
      resultado = "Completá todos los campos.";
    } else {
      const f = m * a;
      resultado = `F = ${f.toFixed(2)} N`;
    }

    //    --- Trabajo Y Energia ---
  } else if (formula === "energia") {
    const m = parseFloat(document.getElementById("m").value);
    const v = parseFloat(document.getElementById("v").value);
    if (isNaN(m) || isNaN(v)) {
      resultado = "Completá todos los campos.";
    } else {
      const ec = 0.5 * m * v * v;
      resultado = `Ec = ${ec.toFixed(2)} J`;
    }

    //    --- Calorimetria ---
  } else if (formula === "calor") {
    const m = parseFloat(document.getElementById("m").value);
    const c = parseFloat(document.getElementById("c").value);
    const t = parseFloat(document.getElementById("T").value);
    if (isNaN(m) || isNaN(c) || isNaN(t)) {
      resultado = "Completá todos los campos.";
    } else {
      const Q = m * c * t;
      resultado = `Q = ${Q.toFixed(2)} J`;
    }
  } else if (formula === "calorLatente") {
    const m = parseFloat(document.getElementById("m").value);
    const l = parseFloat(document.getElementById("L").value);
    if (isNaN(m) || isNaN(l)) {
      resultado = "Completá todos los campos.";
    } else {
      const Q = m * l;
      resultado = `Q = ${Q.toFixed(2)} J`;
    }

  //    --- Calorimetria ---
  }else if (formula === "coulomb") {
    const q1 = parseFloat(document.getElementById("q1").value);
    const q2 = parseFloat(document.getElementById("q2").value);
    const d = parseFloat(document.getElementById("d").value);
    const k = 9*(10**9);
    if (isNaN(d) || isNaN(q1) || isNaN(q2)) {
      resultado = "Completá todos los campos.";
    } else {
      const F = k * ((q1*q2)/(d**2));
      resultado = `F = ${F.toFixed(2)} N`;
    }
  }else if (formula === "campo") {
    const q = parseFloat(document.getElementById("q").value);
    const d = parseFloat(document.getElementById("d").value);
    const k = 9*(10**9);
    if (isNaN(q) || isNaN(d)) {
      resultado = "Completá todos los campos.";
    } else {
      const E = (k * q) / (d**2);
      resultado = `E = ${E.toFixed(2)} N/C`;
    }
  }else if (formula === "fuerza_campo") {
    const m = parseFloat(document.getElementById("m").value);
    const l = parseFloat(document.getElementById("L").value);
    if (isNaN(m) || isNaN(l)) {
      resultado = "Completá todos los campos.";
    } else {
      const Q = m * l;
      resultado = `Q = ${Q.toFixed(2)} J`;
    }
  }  

  document.getElementById("resultado").innerHTML = resultado;
  if (resultado != "Completá todos los campos." || resultado) {
    document.getElementById("copiar-btn").style = "display:block;";
  }
}

function copiarResultado() {
  const resultado = document.getElementById("resultado").innerText;
  if (resultado) {
    navigator.clipboard.writeText(resultado).then(() => {
      const btn = document.getElementById("copiar-btn");
      btn.textContent = "✅ ¡Copiado!";
      setTimeout(() => {
        btn.textContent = "📋 Copiar resultado";
      }, 2000);
    });
  }
}
