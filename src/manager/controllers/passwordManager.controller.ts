import { FastifyReply, FastifyRequest } from "fastify";

import { KeyDerivatorModel } from "../datasources/models/keyDerivator.model.js";

import { AuthModel } from "../../auth/datasources/models/auth.model.js";
import { HashPasswordUseCase } from "../../auth/usecases/hashPassword.usecase.js";
import { PasswordManagerModel } from "../datasources/models/passwordManager.model.js";
import { CreateSaltUseCase } from "../usecases/createSalt.usecase.js";
import { DecryptAESPasswordUseCase } from "../usecases/decryptAESPassword.usecase.js";
import { DerivateKeyUseCase } from "../usecases/derivateKey.usecase.js";
import { EncryptAESPasswordUseCase } from "../usecases/encryptAESPassword.usecase.js";

const authModel = new AuthModel();
const keyDerivatorModel = new KeyDerivatorModel();
const passwordManagerModel = new PasswordManagerModel();

interface DerivateKeyBody {
  password: string;
}

export class PasswordManagerController {
  derivateKey(request: FastifyRequest, reply: FastifyReply) {
    const { password } = request.body as DerivateKeyBody;

    const securePassword = new HashPasswordUseCase(authModel).execute(password);

    const salt = new CreateSaltUseCase(keyDerivatorModel).execute();

    const key = new DerivateKeyUseCase(keyDerivatorModel).execute(
      securePassword,
      salt
    );

    return reply.send({
      message: "Key derived successfully",
      key,
      salt,
      securePassword
    });
  }

  cipherPassword(request: FastifyRequest, reply: FastifyReply) {
    const { password } = request.body as any;

    // TODO: Remove hardcoded master key and salt and use database values
    const masterKey =
      "$2b$12$aRRNBPufw2JCrnEQobDVeefmN/DVQ3DLt2wMWJK4iuK6BcVuWBpEu";
    const salt = "9415a7d13ecd3395e581101ac99edd38";

    const key = new DerivateKeyUseCase(keyDerivatorModel).execute(
      masterKey,
      salt
    );

    const encryptedPassword = new EncryptAESPasswordUseCase(
      passwordManagerModel
    ).execute(password, key);

    return reply.send({
      message: "Password ciphered successfully",
      masterKey: key,
      encriptedPassword: encryptedPassword
    });
  }

  decipherPassword(request: FastifyRequest, reply: FastifyReply) {
    const { password } = request.body as any;

    // TODO: Remove hardcoded master key and salt and use database values
    const masterKey =
      "$2b$12$aRRNBPufw2JCrnEQobDVeefmN/DVQ3DLt2wMWJK4iuK6BcVuWBpEu";
    const salt = "9415a7d13ecd3395e581101ac99edd38";

    const key = new DerivateKeyUseCase(keyDerivatorModel).execute(
      masterKey,
      salt
    );

    const encryptedPassword = "U2FsdGVkX18E94uct3v8QraRYKc9rOOlvIw6YyMwUTk=";

    const decryptedPassword = new DecryptAESPasswordUseCase(
      passwordManagerModel
    ).execute(encryptedPassword, key);

    return reply.send({
      message: "Password deciphered successfully",
      masterKey: key,
      encriptedPassword: encryptedPassword,
      decipherPassword: decryptedPassword
    });
  }
}
