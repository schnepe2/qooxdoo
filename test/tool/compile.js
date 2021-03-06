const fs = require("fs");
const path = require("upath");
const process = require("process");

qx.Class.define("qx.compiler.CompilerApi", {
  extend: qx.tool.cli.api.CompilerApi,

  members: {
    /**
     * Register compiler tests
     * @param {qx.tool.cli.commands.Command} command
     * @return {Promise<void>}
     */
    async beforeTests(command) {
      const COMPILER_TEST_PATH = "integrationtest";
      function addTest(test) {
        let args = [];
        args.push(test + ".js");
        for (const arg of ["colorize", "verbose"]) {
          if (command.argv[arg]) {
            args.push(` --${arg}=${command.argv[arg]}`);
          }
        }
        command.addTest(new qx.tool.cli.api.Test(test, async function () {
          this.info("*********************************************************************************************************");
          this.info("# Running " + test);
          this.info("**********************************************************************************************************");

          result = await qx.tool.utils.Utils.runCommand({
            cwd: COMPILER_TEST_PATH,
            cmd: "node",
            args: args,
            shell: false,
            env: {
              QX_JS: require.main.filename,
              IGNORE_MIGRATION_WARNING: true
            }
          });
          if (result.exitCode === 0) {
            console.log("ok");
          } else {
            console.log("not ok");
          }
          this.setExitCode(result.exitCode);
        })).setNeedsServer(false);
      }
      try {
        let files = fs.readdirSync(COMPILER_TEST_PATH);
        files.forEach(file => {
          if (fs.statSync(path.join(COMPILER_TEST_PATH, file)).isFile() && file.endsWith(".js")) {
            addTest(path.changeExt(path.basename(file), ""));
          }
        });
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    }
  }
});

module.exports = {
  CompilerApi: qx.compiler.CompilerApi
};
