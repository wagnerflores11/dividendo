const database = require('../services/database');

module.exports = {
    async show(req, res) {
        const { id_cliente } = req.body;
        if(!id_cliente) return res.status(400).json({ error: "Dados insuficientes" });
        const data = await database.findById(id_cliente)
        if(data.length === 0) return res.status(400).json({ error: `Não existem dividas cadastradas para o usuário` })
        return res.status(200).json(data)
    },
    
    async showSingle(req, res){
        const id_divida = req.params.id;
        if(!id_divida) return res.status(400).json({ error: 'Nenhuma ID informada' });
        const data = await database.findDivida(id_divida);
        if(data.length === 0) return res.status(400).json({ error: "Divida não encontrada" });
        return res.status(200).json(data[0]);
    },

    async store(req, res){
        const { cliente, motivo, valor, date, id_cliente } = req.body;
        if(!cliente || !motivo || !valor || !date || !id_cliente) return res.status(400).json({ error: "Dados informados insuficientes" });
        
        try {
            await database.create(cliente, motivo, valor, date, id_cliente);
            return res.status(200).json({ message: "Dívida cadastrada com sucesso" });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    async destroy(req, res){
        const id = req.params.id;
        if(!id) return res.status(400).json({ error: 'Nenhuma ID informada' });
        try {
            await database.deleteById(id);
            return res.status(200).json({ message: "Divida removida com sucesso" });
        } catch (err) {
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    },

    async update(req, res) {
        const { id_dividas, cliente, motivo, valor, date } = req.body;
        if(!id_dividas || !cliente || !motivo || !valor || !date) return res.status(400).json({ error: "Dados informados insuficientes" });
        try {
            await database.update(cliente, motivo, valor, date, id_dividas);
            return res.status(200).json({ message: "Divida atualizada com sucesso" });
        } catch (err) {
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

}