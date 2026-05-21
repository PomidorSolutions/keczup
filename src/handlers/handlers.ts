import { Composer } from "grammy";
import { inlineComposer } from "./inline";
import { startComposer } from "./start";

const composition = new Composer();

composition.use(inlineComposer);
composition.use(startComposer);

export { composition };
