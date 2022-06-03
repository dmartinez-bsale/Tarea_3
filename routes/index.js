//*******************************/
// Lista de rutas asociadas a ejemplos
//**************************** */

var express = require("express");
var router = express.Router();
var path = require("path");
const ApiCall = require("../helpers/api_call");
var environment = process.env.NODE_ENV || "development";
var settings = require("../config/settings.json")[environment];

/* GET página donde se despliega la inpormacion de empresa */
router.get("/companies", function (req, res, next) {
    res.sendFile(path.join(process.cwd(), "views", "layouts", "company.html"));
});

/* GET página principal en este ejemplo se despliega la lista de empresas */
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

//- Simulación de datos para cargar el formulario con ellos
router.get("/gateway.json", (req, res, next) => {
    const data = {
        cpnPhone: "7327373278",
        cpnType: 2,
        cpnStatus: false,
    };
    res.json(data);
});
//- Controller para enviar la consulta a la api companies
router.get("/gateway/v1/companies.json", async (req, res, next) => {
    console.log(req.query);
    let url = settings.companiesApi + "/v1/companies.json?";
    for (param in req.query) {
        url += `&${param}=${req.query[param]}`;
    }
    console.log(url);
    try {
        let response = await ApiCall.request(url);

        if (
            response.data != undefined &&
            response.data != null &&
            response.data.code < 300
        ) {
            response = response.data.data;
            console.log(response);
            res.json(response);
        } else {
            res.status(400).json(response);
            console.log(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
//- Controller para enviar la consulta a la api sobre una empresa
router.get("/gateway/v1/companies/:id.json", async (req, res, next) => {
    try {
        let response = await ApiCall.request(
            settings.companiesApi + `/v1/companies/${req.params.id}.json`
        );
        if (
            response.data != undefined &&
            response.data != null &&
            response.data.code < 300
        ) {
            response = response.data.data;
            res.status(200).json(response);
        } else {
            res.status(400).json({ badResponse: response });
            console.log("Respuesta incorrecta, resp de la API:", response);
        }
    } catch (error) {
        res.status(500);
        console.log("Error no controlado, resp de la API: ", error);
        res.json({ error: error });
    }
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
