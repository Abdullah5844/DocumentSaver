exports.validateDocument = (req, res, next) => {
    const { title, content, authorId } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Title is required and must be a non-empty string.' });
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
        return res.status(400).json({ message: 'Content is required and must be a non-empty string.' });
    }

    if (!authorId || typeof authorId !== 'number') {
        return res.status(400).json({ message: 'Author ID is required and must be a number.' });
    }

    next();
}