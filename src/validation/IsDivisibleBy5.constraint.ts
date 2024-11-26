import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDivisibleBy5(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDivisibleBy5',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'number') return false;
          return value % 5 === 0; // Kiểm tra nếu số chia hết cho 5
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be divisible by 5`;
        },
      },
    });
  };
}
