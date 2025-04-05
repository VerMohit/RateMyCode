import { Request, Response } from 'express';
import * as model from '../database/model';
import { CustomeError, NotFoundError } from '../utils/customErrors';

export const getPosts = async (_: Request, res: Response) => {
    try {
        const posts = await model.Post.find()
        console.log(posts)
        if(!posts) {
            throw new NotFoundError(`There are no posts!`);
        }

        // add int logic for if result is found
        res.status( 200)
                  .json( posts )

    } catch (error) {
        console.log(error);

        if(error instanceof CustomeError) {
            console.error(`${error.name}: ${error.message}`);
            console.error(`Status Code: ${error.statusCode}`);
            res.status(error.statusCode)
                      .send({
                                error: error.message,
                                name: error.name,
                            });
        }

        // Handle internal server error
        console.error('Unexpected Error:', error);
        res.status( 500 )
                  .send({
                        error: 'An unexpected error occurred',
                        name: 'InternalServerError',
                    });
    }
};

// export const getPostsByUser = async (req: Request, res: Response) => {
//     try {
//         const username = req.params.username;


//         const postsByUser = await model.Post.find()

//         console.log(posts)
//         if(!posts) {
//             throw new NotFoundError(`There are no posts!`);
//         }

//         // add int logic for if result is found
//         res.status( 200)
//                   .json( posts )

//     } catch (error) {
//         console.log(error);

//         if(error instanceof CustomeError) {
//             console.error(`${error.name}: ${error.message}`);
//             console.error(`Status Code: ${error.statusCode}`);
//             res.status(error.statusCode)
//                       .send({
//                                 error: error.message,
//                                 name: error.name,
//                             });
//         }

//         // Handle internal server error
//         console.error('Unexpected Error:', error);
//         res.status( 500 )
//                   .send({
//                         error: 'An unexpected error occurred',
//                         name: 'InternalServerError',
//                     });
//     }
// };
