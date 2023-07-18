import { Repository } from "typeorm";
import { Reptile } from "../entities/Reptile";
import { dataSource } from "../tools/utils";
import { Family } from "../entities/Family";
import { familyRepository } from "./familyServices";
import { Category, CategoryName } from "../entities/Category";
import categoryServices, { categoryRepository } from "./categoryServices";

export const reptileRepository: Repository<Reptile> =
  dataSource.getRepository(Reptile);

export default {
  create: async (reptile: Reptile, categoryId : number ): Promise<Reptile> => {

    // const addToCategory : Category = await categoryRepository.getByName({
    //   categoryName: Category
    // }) 
    // const category = await categoryRepository.find()
    const category = await categoryRepository.findOneByOrFail({

id: categoryId
    })

    const newReptile = new Reptile()
    newReptile.name = reptile.name
    newReptile.description = reptile.description
    newReptile.price = reptile.price
    newReptile.quantity = reptile.quantity
    newReptile.category = category
    newReptile.photoId = reptile.photoId
    // newReptile.category = reptile.category
    return await reptileRepository.save(newReptile);
  },

  getAll: async (): Promise<Reptile[]> => {
    return await reptileRepository.find();
  },

  getReptileById: async (id: number): Promise<Reptile> => {
    return await reptileRepository.findOneByOrFail({ id });
  },

  getReptileByName: async (name: string): Promise<Reptile> => {
    return await reptileRepository.findOneByOrFail({ name });
  },

  getReptilesByCategory: async (catergoryId : number): Promise<Reptile[]> => {
    const category = await categoryRepository.findOneByOrFail({id: catergoryId})
    if(category === null){
      throw new Error("la categorie n'existe pas")
    }
    return await reptileRepository.findBy({
      category

    })
  },

  addToFamily: async (name: string, type: string): Promise<Reptile> => {
    const reptileToAdd: Reptile = await reptileRepository.findOneByOrFail({
      name,
    });
    const targetFamily: Family = await familyRepository.findOneByOrFail({
      type,
    });
    if (reptileToAdd === null || targetFamily === null) {
      throw new Error("Erreur à l'ajout de la famille ");
    }
    reptileToAdd.family = targetFamily;
    return await reptileRepository.save(reptileToAdd);
  },
};
