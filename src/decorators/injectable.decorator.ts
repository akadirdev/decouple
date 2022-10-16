import "reflect-metadata";

export const injectable = () => {
  return (target: Function) => {
    Reflect.defineMetadata("meta:injectable", true, target);
  };
};
