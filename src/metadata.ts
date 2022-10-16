import "reflect-metadata";

export const setMetadata = <K>(target: Object, key: string, data: K) => {
  Reflect.defineMetadata(
    key,
    data,
    typeof target === "object" ? target.constructor : target
  );
};

export const getMetadata = <K>(target: Object, key: string): K => {
  return Reflect.getMetadata(
    key,
    typeof target === "object" ? target.constructor : target
  );
};
