//*******************************/
// Lista de rutas asociadas a ejemplos
//**************************** */

var express = require("express");
var router = express.Router();
var path = require("path");
const ApiCall = require("../helpers/api_call");

/* GET página principal en este ejemplo se despliega un formularios */
router.get("/companies", function (req, res, next) {
    res.sendFile(path.join(process.cwd(), "views", "layouts", "company.html"));
});

/* GET página principal en este ejemplo se despliega la inpormacion de empresa */
router.get("/", function (req, res, next) {
    res.sendFile(
        path.join(process.cwd(), "views", "layouts", "companiesList.html")
    );
});
// - put de simulacion del enpoint de la tarea
router.put("/v1/companies/:id.json", function (req, res, next) {
    let response = {};
    response.code = 200;
    response.data = req.body;
    res.status(200);
    res.json(response);
});
/**Página de despliegue de listas */
router.get("/list", function (req, res, next) {
    res.sendFile(path.join(__dirname, "public", "list.html"));
});

// Simulación de datos para cargar el formulario con ellos
router.get("/gateway.json", (req, res, next) => {
    const data = {
        cpnPhone: "7327373278",
        cpnType: 2,
        cpnStatus: false,
    };
    res.json(data);
});

//Ejemplo simulado de retorno de API para el despliegue de listas.
router.get("/gateway/list.json", (req, res, next) => {
    const response = {
        code: "200",
        data: [
            // {
            //   id: 11844,
            //   cpnName: "Jaime",
            //   cpnLastName: "Gonzalez",
            //   phone: "4edb25269b56",
            //   type: "tipo1"
            // },
            // {
            //   id: 11844,
            //   cpnName: "Jaime",
            //   lastName: "Paredes",
            //   phone: "4edb25269b56",
            //   type: "tipo2"
            // },
            // {
            //   id: 11844,
            //   cpnName: "Gustavo",
            //   lastName: "Saavedra",
            //   phone: "4edb25269b56",
            //   type: "tipo1"
            // }
        ],
    };

    res.json(response);
});

module.exports = router;
