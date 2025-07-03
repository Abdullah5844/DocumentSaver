const Document = require('../models/document');
const User = require('../models/user');

const {validateDocument} = require('../utils/validator');

exports.create = async (req, res) => {
    const {title, content} = req.body;

    try {
        const {error} = validateDocument({title, content});
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        const document = await Document.create({
            title,
            content,
            userId: req.user.id
        });

        res.status(201).json({message: 'Document created successfully', document});
    } catch (error) {
        res.status(500).json({message: 'Error creating document', error});
    }
}

exports.edit = async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;

    try {
        const document = await Document.findByPk(id);

        if (!document) {
            return res.status(404).json({message: 'Document not found'});
        }

        if (document.userId !== req.user.id) {
            return res.status(403).json({message: 'Forbidden'});
        }

        document.title = title;
        document.content = content;
        await document.save();

        res.status(200).json({message: 'Document updated successfully', document});
    } catch (error) {
        res.status(500).json({message: 'Error updating document', error});
    }
}

exports.view = async (req, res) => {
    const {id} = req.params;

    try {
        const document = await Document.findByPk(id, {
            include: [{model: User, attributes: ['fullname', 'email']}]
        });

        if (!document) {
            return res.status(404).json({message: 'Document not found'});
        }

        res.status(200).json({document});
    } catch (error) {
        res.status(500).json({message: 'Error retrieving document', error});
    }
}

exports.list = async (req, res) => {
    try {
        const documents = await Document.findAll({
            where: {userId: req.user.id},
            include: [{model: User, attributes: ['fullname', 'email']}]
        });

        res.status(200).json({documents});
    } catch (error) {
        res.status(500).json({message: 'Error retrieving documents', error});
    }
}

exports.delete = async (req, res) => {
    const {id} = req.params;

    try {
        const document = await Document.findByPk(id);

        if (!document) {
            return res.status(404).json({message: 'Document not found'});
        }

        if (document.userId !== req.user.id) {
            return res.status(403).json({message: 'Forbidden'});
        }

        await document.destroy();

        res.status(200).json({message: 'Document deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting document', error});
    }
}