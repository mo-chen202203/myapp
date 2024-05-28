import { Module } from '@nestjs/common';
import { FirstService } from './services/first.service';
import { SecondService } from './services/second.service';
import { ThirdService } from './services/third.service';
import { FourthService } from './services/fourth.service';
import { TestController } from './controllers/test.controller';
const firstObject = {
  useValue: () => 'useValue提供者',
  useAlias: () => '别名提供者',
};


@Module({
  controllers: [TestController],
  providers: [
    {
        provide: FirstService,
        useValue: firstObject,
    },
    {
        provide: 'ID-EXAMPLE',
        useValue: FirstService,
    },
    {
        provide: SecondService,
        useClass: ThirdService,
    },
    {
        provide: 'FACTORY-EXAMPLE',
        useFactory(second: SecondService) {
            const factory = new FourthService(second);
            return factory;
        },
        inject: [SecondService],
    },
    {
        provide: 'ALIAS-EXAMPLE',
        useExisting: FirstService,
    },
    {
        provide: 'ASYNC-EXAMPLE',
        useFactory: async () => {
            const factory = new FourthService(new SecondService());
            return factory.getPromise();
        },
    },
],
})
export class ExampleModule {}