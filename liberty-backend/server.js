const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//////// Importing router files (Controllers)
const usersRouter = require('./routes/users');
// const cashiersRouter = require('./routes/cashiers');
const prodCategoryRouter = require('./routes/prodCategories');
const customerRouter = require('./routes/customer');
const suppliersRouter = require('./routes/suppliers');
const productsRouter = require('./routes/products');
const suppOrder = require('./routes/supplyOrder');
const sales = require('./routes/sales');
const mailSupplierRouter = require('./routes/mailSuppliers');
const authenticationRouter = require('./routes/authentication');

//////******************  Using the imported router files
app.use('/users', usersRouter);
// app.use('/cashiers', cashiersRouter);
app.use('/prodCategories', prodCategoryRouter);
app.use('/customers', customerRouter);
app.use('/suppliers', suppliersRouter);
app.use('/products', productsRouter);
app.use('/suppOrder', suppOrder);
app.use('/sales', sales );
app.use('/mailSuppliers', mailSupplierRouter);
app.use('/authentication', authenticationRouter);


// starting the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



