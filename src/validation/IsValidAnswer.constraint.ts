import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  // Custom validator to check if answer is one of the options
  export function IsValidAnswer(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isValidAnswer',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const object = args.object as any;
            // Check if answer is one of the optionA, optionB, optionC, or optionD
            return (
              value === object.optionA ||
              value === object.optionB ||
              value === object.optionC ||
              (object.optionD && value === object.optionD)
            );
          },
          defaultMessage(args: ValidationArguments) {
            return 'Answer must be one of the options A, B, C, or D';
          },
        },
      });
    };
  }