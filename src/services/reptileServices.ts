import { Repository } from "typeorm";
import { dataSource } from "../tools/utils";
import { Reptile } from "../entities/Reptile";
import { Category, CategoryName } from "../entities/Category";
import { categoryRepository } from "./categoryServices";
import { upkeepRepository } from "./upkeepServices";
import { Upkeep } from "../entities/Upkeep";

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
    newReptile.scientificName = reptile.scientificName
    newReptile.dayHumidity = reptile.dayHumidity
    newReptile.dayTemp = reptile.dayTemp
    newReptile.nightTemp = reptile.nightTemp
    newReptile.nightHumidity = reptile.nightHumidity
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

  // getReptilesByCategory: async (catergoryId : number): Promise<Reptile[]> => {
  //   const category = await categoryRepository.findOneByOrFail({id: catergoryId})
  //   if(category === null){
  //     throw new Error("la categorie n'existe pas")
  //   }
  //   return await reptileRepository.findBy({
  //     category

  //   })
  // },

  getReptilesByCategory: async (categoryName: CategoryName): Promise<Reptile[]> => {
    const targetCategory = await categoryRepository.findOneByOrFail({ categoryName });
    return await reptileRepository.findBy({ category: targetCategory })
  },

  addToCategory: async (name: string, categoryName: CategoryName): Promise<Reptile> => {
    const reptileToAdd: Reptile = await reptileRepository.findOneByOrFail({
      name,
    });
    const targetCategory: Category = await categoryRepository.findOneByOrFail({
      categoryName
    });
    if (reptileToAdd === null || targetCategory === null) {
      throw new Error("Erreur à l'ajout de la catégorie.");
    }
    reptileToAdd.category = targetCategory;
    return await reptileRepository.save(reptileToAdd);
  },

  link: async (reptileId: number, upkeepId: number) => {
    const reptile: Reptile = await reptileRepository.findOneByOrFail({ id: reptileId });
    const upkeep: Upkeep = await upkeepRepository.findOneByOrFail({ id: upkeepId });
    reptile.upkeep = upkeep;
    return await reptileRepository.save(reptile);
  },

  update: async (reptileId: number, name: string) => {
    await dataSource
    .createQueryBuilder()
    .update(Reptile)
    .set({ name: name })
    .where("id = :id", { id: reptileId })
    .execute()
    return await reptileRepository.findOneByOrFail({ id: reptileId});
  },

  findAnimalWithUpkeep: async (animal: string) => {
    const reptile = await reptileRepository.findOneByOrFail({ name: animal });
    //const upkeep = await upkeepRepository.findOneByOrFail({ reptileId: reptile });
    return reptile;
  },
};
