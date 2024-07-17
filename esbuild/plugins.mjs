export const CSSPlugin = {
  name: "CSS Import Assertions",
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await readFile(args.path, "utf8")
      const contents = `
          const styles = new CSSStyleSheet();
          styles.replaceSync(\`${css.replaceAll(/[`$]/gm, "\\$&")}\`);
          export default styles;`
      return { contents }
    })
  },
}
