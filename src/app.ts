import { bootstrapp } from "@/cli";
import { getCliCommand } from "@/utils/getCliCommand";
import { runCommand } from "@/utils/runCommand";

try {
  bootstrapp();
} catch {
  process.exit(0);
}

runCommand(getCliCommand());
