const Product = require('../models/Product');
const { verifyTokenAndAuthorization,
    verifyTokenAndAdmin } = require('../middleware/verifyToken')
const router = require('express').Router();
const cloudinary = require("../utils/cloudinary");

//create product
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        if (req.body.img) {
            const uploadRes = await cloudinary.uploader.upload(req.body.img, {
                upload_preset: "clothesShop",
            });

            if (uploadRes) {
                const newProduct = new Product({ ...req.body, img: uploadRes });

                const saveProduct = await newProduct.save();
                res.status(200).json(saveProduct);
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

// //update product by id
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    if (req.body.img) {
        try {
            const destroyRes = await cloudinary.uploader.destroy(
                req.body.img.public_id);
            if (destroyRes) {
                const uploadedRes = await cloudinary.uploader.upload(
                    req.body.image,
                    {
                        upload_preset: 'clothesShop'
                    }
                );

                if (uploadedRes) {
                    const updatedProduct = await Product.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: {
                                ...req.body,
                                img: uploadedRes
                            }
                        },
                        { new: true }
                    );

                    res.status(200).send(updatedProduct)
                }

            }
        }
        catch (error) {
            res.status(500).send(error)
        }
        // try {
        //     //update
        //     const updateProduct = await Product.findByIdAndUpdate(
        //         req.params.id,
        //         {
        //             $set: {
        //                 ...req.body,
        //             }
        //         },
        //         { new: true }
        //     );

        //     res.status(200).json(updateProduct)
        // } catch (error) {
        //     res.status(500).json(error)
        // }
    }
})

// //delete product by id
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    // try {
    //     const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    //     res.status(200).send(deleteProduct)
    // } catch (error) {
    //     res.status(500).json(error)
    // }
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            res.status(404).send('Not found..')
        }

        if (product.img.public_id) {
            const destroyResponse = await cloudinary.uploader.destroy(product.img.public_id);
            if (destroyResponse) {
                const deleteProduct = await Product.findByIdAndDelete(req.params.id)
                res.status(200).send(deleteProduct)
            }
        }

        else {
            console.log('Action terminated. Failed to deleted product image...')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// //get product by id
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).json(error)
    }
})

// //get all product
router.get('/', async (req, res) => {
    const pNew = req.query.new;
    const pCategory = req.query.category;
    try {
        let products;
        if (pNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        }
        else if (pCategory) {
            products = await Product.find({
                categories: {
                    $in: [pCategory]
                }
            })
        } else {
            products = await Product.find().sort({ createdAt: -1 })
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router