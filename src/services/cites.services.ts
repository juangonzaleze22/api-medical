import { STATUS_CITE } from "../enums/cite.enum";
import { Cite } from "../interfaces/cite.interface";
import CiteModel from "../models/cites";
import UserModel from "../models/user";


const getCites = async (typeCite: string) => {
    
    try {
        const getAllCites = await CiteModel.find(
            typeCite != undefined ? { status: typeCite } : {})
            .sort({ date: 1 });

        return {
            status: 'success',
            cites: getAllCites
        }

    } catch (error) {
        return {
            message: error
        };
    }
};

const getCiteById = async (id: string) => {
    try {
        const cite = await CiteModel.findById(id)

        if (!cite) {
            return {
                status: 'cite_not_found',
                message: 'Appointment not found!'
            };
        }

        return {
            status: 'success',
            data: cite
        };
    } catch (error) {
        return {
            status: 'error',
            message: error
        };
    }
}

const getCitesByUser = async (id: string, typeCite: string) => {
    
    try {
        const cites = await CiteModel.find();
        const filteredCiteByUserId = cites.filter((cite: Cite) => cite.user?.userId?.toString() === id && cite.status === typeCite);
        
        
        
        if (!filteredCiteByUserId) {
            return {
                status: 'cite_not_found',
                message: 'Appointment not found!'
            };
        }

        return {
            status: 'success',
            cites: filteredCiteByUserId
        }

    } catch (error) {
        return {
            status: 'error',
            message: error
        };
    }
}

const createCite = async ({ title, description, date, imageUrl, idUserReserved }: Cite) => {

    try {
        const user = await UserModel.findById(idUserReserved);
        const allcites = await CiteModel.find();

        console.log("uuser", user, idUserReserved)

        const isSameDayCite = allcites.some((cite: Cite) => cite.date === date);

        if (isSameDayCite) {
            return {
                status: 'same_date_error',
                message: "Error creating appointment!, pleade pick other date",
            }
        }

        if (!user) {
            return {
                status: 'user_not_found',
                message: "Error creating appointment!",
            }
        }

        const { displayName, _id, email, photoURL } = user;

        const userData = {
            displayName,
            userId: _id,
            email,
            photoURL
        };

        const newCite = new CiteModel({
            title,
            description,
            date,
            imageUrl,
            user: userData,
            status: 'PENDING'
        });
        await newCite.save();

        const data = {
            status: 'success',
            message: 'Appointment created successfully!',
            cite: newCite
        };

        return data

    } catch (error) {
        console.error(error);
        return {
            message: "Error creating appointment!",
        }
    }
};

const updateCite = async ({ body, id }: { body: Cite, id: string }) => {

    console.log("body", body)
    try {
        const cite = await CiteModel.findByIdAndUpdate(id, body, { new: true });
        const status: STATUS_CITE = body.status;

        if (!Object.values(STATUS_CITE).includes(status)) {
            return {
                status: 'status_not_valid',
                message: 'Status is not valid!'
            };
        }

        if (!cite) {
            return {
                status: 'cite_not_found',
                message: 'Appointment not found!'
            };
        }

        return {
            status: 'success',
            data: cite
        };
    } catch (error) {
        return {
            status: 'error',
            message: error
        };
    }
}

const deleteCiteById = async (id: string) => {
    try {
        const cite = await CiteModel.findByIdAndDelete(id);

        if (!cite) {
            return {
                status: 'cite_not_found',
                message: 'Appointment not found!'
            };
        }

        return {
            status: 'success',
            data: cite
        };
    } catch (error) {
        return {
            status: 'error',
            message: error
        };
    }
}


export { getCites, getCitesByUser, createCite, updateCite, getCiteById, deleteCiteById };