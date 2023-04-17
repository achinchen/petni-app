export enum Gender {
  Female,
  Male,
  Null
}

export enum Family {
  Cat,
  Dog
}

export enum Size {
  Small,
  Medium,
  Large
}

export class Animal {
  constructor(
    public id: number,
    public code: string,
    public size: Size,
    public color: string,
    public family: Family,
    public gender: Gender,
    public imageUrl: string,
    public location: string,
    public address: string,
    public tel: string,
    public note: string,
    public name: string,
    public openAt: Date | string,
    public createdAt: Date | string,
    public updatedAt: Date | string,
    public userId?: number
  ) {}
}
