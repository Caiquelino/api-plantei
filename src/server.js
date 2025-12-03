import express from 'express';

// IMPORTAR MODELS AQUI
import './models/Produto.js';
import { sequelize } from './config/database.js';
import { Produto } from './models/Produto.js';

const HOST = '127.0.0.1'
const PORT = '5000'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Produtos funcionando 🚀');
});


// Criar um produto
app.post('/produto',  async (req, res) => {
    try {
        //payload é o produto que vem do request, através do body
        const payload = req.body;

        const produto = await Produto.create(payload)

        res.status(201).json({
            mensagem: "Produto criado com sucesso!",
            data: produto,
        });

    } catch (err) {
        console.error(err);

        // erros de validação do Sequelize
        if (err.name === "SequelizeValidationError") {
            return res.status(400).json({
                erro: err.errors.map(e => e.message)
            });
        }

        res.status(500).json({ erro: "Erro ao criar produto" });
    }
})

try {
    await sequelize.authenticate();
    console.log("🎉 Conectado ao Postgres Neon com sucesso!");

    // CRIAR TABELAS AUTOMATICAMENTE
    await sequelize.sync({ alter: true }); // ou { force: true } se quiser recriar
    console.log("📦 Modelos sincronizados com o banco!");

    app.listen(PORT, () =>
        console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`)
    );
} catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
}