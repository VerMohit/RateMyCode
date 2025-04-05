import { Request, Response } from 'express';
import { Post } from '../database/model';
import { CustomeError, NotFoundError } from '../utils/customErrors';

export const getPosts = async (_: Request, res: Response) => {
    try {
        const posts = await Post.find()
        console.log(posts)
        if(!posts) {
            throw new NotFoundError(`There are no posts!`);
        }

        // add int logic for if result is found
        res.status( 200 )
                  .json( posts )

    } catch (error) {
        console.log(error);

        if(error instanceof CustomeError) {
            console.error(`${error.name}: ${error.message}`);
            console.error(`Status Code: ${error.statusCode}`);
            res.status(error.statusCode)
                      .json({
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

export const getPostsByUser = async (req: Request, res: Response) => {
    try {
        const userName = req.params.username;

        const postsByUser = await Post.aggregate([
            {
                $lookup: {
                from: 'users',          // Collection name in MongoDB for the User model
                localField: 'authorId', // Field in Post that links to User
                foreignField: '_id',    // Field in User collection to match
                as: 'author'            // The name of the new array field to add to Post documents
                }
            },
            {
                // Flatten the newly added array field
                $unwind: '$author' 
            },
            {
                // Filter result
                $match: {
                  'author.username': userName 
                }
              }
          ]);
          
          console.log(postsByUser);

        res.status( 200 )
                  .json( postsByUser )

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

