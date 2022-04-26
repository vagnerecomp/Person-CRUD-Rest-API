// Importação do router do express
const router = require('express').Router();
const Person = require('../models/Person');



// Create person
router.post('/', async (req, res)=>{
    //Person.
    const {name, salary, approved} = req.body;

    //Validações
    if(!name){
        res.status(422).json({message: "O campo nome é obrigatório"});
        return
    }

    const person = {
        name,
        salary,
        approved,
    };

    /*Aqui eu vou tentar criar a entidade e enviar dados no banco mais essa tentativa pode falhar
    Por isso vou usar try/catch

    Para criar dados no MongoDB basta passar o objeto que representa a entdade para o mongoose
    Com NoSQL não precisamos definir colunas. O Banco não relacional é flexível, eu posso ter
    Duas pessoas, por exemple, com campos variados (Ex: Uma possui o campo de sobrenome e outra não)
    */
    try{
         //Aqui a gente ESPERA enquanto o dado é salvo  e depois enviamos uma mensagem informando que a inserçãoo deu certo
        await Person.create(person)
        res.status(201).json({message: "Pessoa inserida com sucesso"});
    } catch (error){
        res.status(500).json({error: error}); //Essa mensagem de erro pode não ser a melhor solução porque impliplicaria em uma falha no nosso software. Talvez a gente tenha que criar um arquivo de log para salvar essa requisição
    }
})

// Read People
router.get('/', async (req, res)=>{
    try{
        const people = await Person.find();
        res.status(200).json(people);
    }catch(error){
        res.status(500).json({error: error})
    }
})

// Read Person
router.get('/:id', async(req, res)=>{
    // Extrair o dado da requisição pela url = req.params

    const id = req.params.id;

    try{
        const person = await Person.findOne({_id: id});
        if(!person){
            res.status(422).json({message: "O usuário não foi encontrado."});
            return
        }
        res.status(200).json(person);
    }catch(error){
        res.status(500).json({error: error});
    }
})


// Update user (PUR or PATCH) O put espera receber o objeto completo, enquanto o patch aceita a atualização de campos específicos

router.patch('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const {name, salary, approved} = req.body;
        const person = {
            name,
            salary,
            approved,
        }

        const updatedPerson = await Person.updateOne({_id: id}, person);

        if(updatedPerson.matchedCount === 0){
            res.status(500).json({message: "Usuário não encontrado."});
            return
        }
        
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    const person = await Person.findOne({_id: id});
    
    if(!person){
        res.status(422).json({message: "Usuário não encontrado."});
        return
    }

    try {
        await Person.deleteOne({_id: id});
        res.status(200).json({message: "Usuário removido com sucesso."})
    } catch (error) {
        res.status(500).json({error: error});
    }
})
 module.exports = router