const formulasPorTema = {
    cinematica: [
      { id: "mruv", nombre: "Velocidad final (v = v₀ + at)" }
    ],
    dinamica: [
      { id: "fuerza", nombre: "Fuerza (F = m·a)" }
    ],
    energia: [
      { id: "energia", nombre: "Energía cinética (Ec = ½·m·v²)" }
    ]
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
  
    formulasPorTema[tema].forEach(formula => {
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
  
    if (formula === "mruv") {
      html += `
        <p>$v = v_0 + a \\cdot t$</p>
        <label>v₀ (m/s): <input type="number" id="v0"></label>
        <label>a (m/s²): <input type="number" id="a"></label>
        <label>t (s): <input type="number" id="t"></label>
      `;
    } else if (formula === "fuerza") {
      html += `
        <p><p>$F = m \\cdot a$</p></p>
        <label>m (kg): <input type="number" id="m"></label>
        <label>a (m/s²): <input type="number" id="a"></label>
      `;
    } else if (formula === "energia") {
      html += `
        <p><p>$E_c = \\frac{1}{2} m \\cdot v^2$</p></p>
        <label>m (kg): <input type="number" id="m"></label>
        <label>v (m/s): <input type="number" id="v"></label>
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
  
    if (formula === "mruv") {
      const v0 = parseFloat(document.getElementById("v0").value);
      const a = parseFloat(document.getElementById("a").value);
      const t = parseFloat(document.getElementById("t").value);
      if (isNaN(v0) || isNaN(a) || isNaN(t)) {
        resultado = "Completá todos los campos.";
      } else {
        const v = v0 + a * t;
        resultado = `v = ${v.toFixed(2)} m/s (v = ${v0} + ${a}·${t})`;
      }
  
    } else if (formula === "fuerza") {
      const m = parseFloat(document.getElementById("m").value);
      const a = parseFloat(document.getElementById("a").value);
      if (isNaN(m) || isNaN(a)) {
        resultado = "Completá todos los campos.";
      } else {
        const f = m * a;
        resultado = `F = ${f.toFixed(2)} N (F = ${m}·${a})`;
      }
  
    } else if (formula === "energia") {
      const m = parseFloat(document.getElementById("m").value);
      const v = parseFloat(document.getElementById("v").value);
      if (isNaN(m) || isNaN(v)) {
        resultado = "Completá todos los campos.";
      } else {
        const ec = 0.5 * m * v * v;
        resultado = `Ec = ${ec.toFixed(2)} J (Ec = ½·${m}·${v}²)`;
      }
    }
  
    document.getElementById("resultado").innerHTML = resultado;
  }
  