export class AnimalFollow {
  constructor(
    public id: string,
    public animalId: string,
    public createdAt: Date | string,
    public updatedA: Date | string,
    public count: number
  ) {}
}
