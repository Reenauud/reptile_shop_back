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
  create: async (reptile: Reptile): Promise<Reptile> => {
    return await reptileRepository.save(reptile);
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
