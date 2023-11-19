const fs = require("fs");
const fecha = new Date();
const hora = fecha.getHours().toString() + ":" + fecha.getMinutes().toString();
const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const hoy = dias[fecha.getDay()] + " " + fecha.toLocaleDateString();

const horaDeLaVoz = (program) => {
  program = program.toUpperCase();
  let resultado = [];
  const info = fs
    .readFileSync("./antena3programacion.txt", "utf-8")
    .split("wrapper-item-title")
    .filter((elemento) => elemento.includes(program))
    .join("")
    .split("2023")
    .filter((elemento) => elemento.includes(":"))
    .forEach((elemento) => {
      let corte = elemento.slice(1, 6);
      resultado.push(corte);
    });
  resultado = resultado.filter((elemento) => elemento.includes(":"));
  if (resultado.length === 0) {
    console.log(`Hoy ${hoy} no pasan ${program}`);
  } else {
    let hora_adaptada = resultado.map((elemento) => {
      let hora = elemento.split(":");
      hora[0] = parseInt(hora[0]);
      if (hora[0] < 5) {
        hora[0] = hora[0] + 24;
      }
      hora[0] = hora[0] - 5;
      if (hora[0] > 12) {
        hora[0] = hora[0] - 12;
      }
      return hora.join(":");
    });
    console.log(
      `Hoy ${hoy} pasan ${program} desde las ${hora_adaptada[0]} p.m. hasta las ${hora_adaptada[1]} p.m.`
    );
  }
};

horaDeLaVoz(process.argv[2] ?? "La Voz");
