"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const startServer = async () => {
//   console.log('Starting server...');
//   await connectDB();
//   console.log('Connected to database');
//   const PORT = process.env.PORT || 8080;
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
//   operator();
//   console.log('Operator started');
//   // indexer();
//   // console.log('Indexer started');
// };
// startServer();
const PORT = process.env.PORT || 8080;
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
