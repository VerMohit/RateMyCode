import { Request, Response } from 'express';
import * as model from '../database/model';
import { CustomeError, NotFoundError } from '../utils/customErrors';

export const getUsers = async (_: Request, res: Response) => {
    try {
        const users = await model.User.find()
        console.log(users)
        if(!users) {
            throw new NotFoundError(`There are no users!`);
        }

        res.status( 200 )
                  .json( users )

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

export const getUserByUsername = async (req: Request, res: Response) => {
    const userName = req.params.username;
    console.log(userName)
    try {
        const user = await model.User.findOne({username: userName});
        
        console.log(user)

        if(!user) {
            throw new NotFoundError(`Person with username not found: ${userName}`);
        }

        res.status( 200 )
                  .json( user )

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


