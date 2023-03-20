export class AnimalFollow {
  constructor(
    public id: number,
    public animalId: number,
    public createdAt: Date | string,
    public updatedAt: Date | string,
    public count: number
  ) {}
}
