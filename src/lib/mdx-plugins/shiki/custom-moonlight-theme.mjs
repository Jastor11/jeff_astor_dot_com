// custom colors
const fadedGrey = "#858DB7"
const deepRed = "#FF476E"
const neonBlue = "#46b4d6"
const relaxedBlue = "#94BFFF"
const dulledNeonGreen = "#4fd6be"
const neonGreen = dulledNeonGreen
const brightPink = "#F1B3F1"
const purpley = "#BD93F9"

const foregroundPrimary = "#c8d3f5"
const backgroundPrimary = "#1F2028"

const stringsPrimary = neonGreen
const punctuation = fadedGrey
const functionPrimary = purpley // blue
const functionParameters = brightPink // pink
const keywordPrimary = relaxedBlue
const ClassDefinition = "#FFC777" // yellow
const numberAndBoolean = "#ff966c" // orange
const comments = "#858aa6" // grey
const constants = "#ff98a4" // red
const variablesAndText = "#c8d3f5" // white

const additionalCustomSettings = [
  // some nice JS keyword stuff
  {
    name: "Source Js Keyword Operator Delete,source Js Keyword Operator In,source Js Keyword Operator Of,source Js Keyword Operator Instanceof,source Js Keyword Operator New,source Js Keyword Operator Typeof,source Js Keyword Operator Void",
    // "scope": "keyword.operator.expression.delete,keyword.operator.expression.in,keyword.operator.expression.of,keyword.operator.expression.instanceof,keyword.operator.new,keyword.operator.expression.typeof,keyword.operator.expression.void",
    scope: [
      "keyword.operator.expression.delete",
      "keyword.operator.expression.in",
      "keyword.operator.expression.of",
      "keyword.operator.expression.instanceof",
      "keyword.operator.new",
      "keyword.operator.expression.typeof",
      "keyword.operator.expression.void",
      //
    ],
    settings: {
      // "foreground": "#54b9ff"
      foreground: deepRed,
    },
  },
]

export const theme = {
  name: "Moonlight II",
  type: "dark",
  fg: foregroundPrimary,
  bg: backgroundPrimary,
  settings: [
    {
      settings: {
        foreground: foregroundPrimary,
        background: backgroundPrimary,
      },
    },
    ...additionalCustomSettings,
    {
      scope: "emphasis",
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: "strong",
      settings: {
        fontStyle: "bold",
      },
    },
    {
      name: "Comment",
      scope: ["comment", "punctuation.definition.comment", "string.quoted.docstring"],
      settings: {
        foreground: comments,
      },
    },
    {
      name: "Variables and Plain Text",
      scope: ["variable", "support.variable", "string constant.other.placeholder", "text.html"],
      settings: {
        foreground: variablesAndText,
      },
    },
    {
      name: "DOM Variables",
      scope: [
        "support.variable.dom",
        "support.constant.math",
        "support.type.object.module",
        "support.variable.object.process",
        "support.constant.json",
      ],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "Nil",
      scope: ["constant.language.undefined", "constant.language.null"],
      settings: {
        foreground: "#7f85a3",
      },
    },
    {
      name: "PHP Constants",
      scope: ["constant.other.php"],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "Colors",
      scope: ["constant.other.color"],
      settings: {
        foreground: "#ffffff",
      },
    },
    {
      name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: {
        foreground: "#ff5370",
      },
    },
    {
      name: "Invalid deprecated",
      scope: ["invalid.deprecated"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "Keyword, Storage",
      scope: ["keyword", "storage.type", "storage.modifier", "keyword.other.important"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "Keyword, Storage",
      scope: ["keyword.control", "storage"],
      settings: {},
    },
    {
      name: "Interpolation",
      scope: ["punctuation.definition.template-expression", "punctuation.section.embedded"],
      settings: {
        foreground: punctuation,
      },
    },
    {
      name: "Spread",
      scope: ["keyword.operator.spread", "keyword.operator.rest"],
      settings: {
        foreground: "#ff757f",
        fontStyle: "bold",
      },
    },
    {
      name: "Operator, Misc",
      scope: [
        "keyword.operator",
        "keyword.control",
        "punctuation",
        "punctuation.definition.string",
        "punctuation.support.type.property-name",
        "text.html.vue-html meta.tag",
        "punctuation.definition.keyword",
        "punctuation.terminator.rule",
        "punctuation.definition.entity",
        "constant.other.color",
        "meta.tag",
        "punctuation.definition.tag",
        "punctuation.separator.inheritance.php",
        "punctuation.definition.block.tag",
        "punctuation.definition.tag.html",
        "punctuation.definition.tag.begin.html",
        "punctuation.definition.tag.end.html",
        "meta.property-list",
        "meta.brace.square",
        "keyword.other.template",
        "keyword.other.substitution",
      ],
      settings: {
        // foreground: punctuation,
        foreground: relaxedBlue,
      },
    },
    // {
    //   name: "Keyword Control",
    //   scope: ["keyword.control"],
    //   settings: {},
    // },
    {
      name: "Tag",
      scope: ["entity.name.tag", "meta.tag", "markup.deleted.git_gutter"],
      settings: {
        // foreground: "#ff757f",
        foreground: neonBlue,
      },
    },
    {
      name: "Function, Special Method",
      scope: ["entity.name.function", "variable.function", "keyword.other.special-method"],
      settings: {
        foreground: functionPrimary,
      },
    },
    {
      name: "Support Function",
      scope: ["support.function", "meta.function-call entity.name.function"],
      settings: {
        foreground: "#65bcff",
      },
    },
    {
      name: "C-related Block Level Variables",
      scope: ["source.cpp meta.block variable.other"],
      settings: {
        foreground: "#ff757f",
      },
    },
    {
      name: "Other Variable, String Link",
      scope: ["support.other.variable", "string.other.link"],
      settings: {
        foreground: "#ff757f",
      },
    },
    {
      name: "Constant, Function Argument, Tag Attribute, Embedded",
      scope: [
        "variable.other.constant",
        "constant.language",
        "keyword.other.type.php",
        "storage.type.php",
        "support.constant",
        "constant.character",
        "constant.escape",
        "keyword.other.unit",
      ],
      settings: {
        foreground: constants,
      },
    },
    {
      name: "Number, Boolean",
      scope: [
        "constant.numeric",
        "constant.language.boolean",
        "constant.language.json",
        "constant.language.infinity",
        "constant.language.nan",
      ],
      settings: {
        foreground: numberAndBoolean,
      },
    },
    {
      name: "Function Argument",
      scope: ["variable.parameter.function.language.special", "variable.parameter", "meta.function.parameter variable"],
      settings: {
        foreground: functionParameters,
      },
    },
    {
      name: "String, Symbols, Inherited Class, Markup Heading",
      scope: [
        "string",
        "constant.other.symbol",
        "constant.other.key",
        "entity.other.inherited-class",
        "markup.heading",
        "markup.inserted.git_gutter",
        "meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
        "meta.attribute-selector",
      ],
      settings: {
        fontStyle: "",
        foreground: stringsPrimary,
      },
    },
    {
      name: "Object",
      scope: ["variable.other.object"],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "Object Key",
      scope: [
        "meta.object-literal.key",
        "string.alias.graphql",
        "string.unquoted.graphql",
        "string.unquoted.alias.graphql",
        "meta.field.declaration.ts variable.object.property",
        "variable.object.property",
      ],
      settings: {
        // foreground: "#4fd6be",
        foreground: foregroundPrimary,
      },
    },
    {
      name: "Nested Object Property",
      scope: ["meta.object.member", "variable.other.object.property"],
      settings: {
        foreground: "#a9b8e8",
      },
    },
    {
      name: "Object Property",
      scope: ["variable.other.property", "support.variable.property", "support.variable.property.dom"],
      settings: {
        foreground: "#a9b8e8",
      },
    },
    {
      name: "Types Fixes",
      scope: ["source.haskell storage.type", "source.c storage.type", "source.java storage.type"],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "Lambda Arrow",
      scope: ["storage.type.function"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "Class, Support",
      scope: [
        "entity.name",
        "support.type",
        "support.class",
        "support.orther.namespace.use.php",
        "meta.use.php",
        "support.other.namespace.php",
        "markup.changed.git_gutter",
        "support.type.sys-types",
      ],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "Entity types",
      scope: ["support.type"],
      settings: {
        foreground: numberAndBoolean,
      },
    },
    {
      name: "CSS Class and Support",
      scope: [
        "source.css support.type.property-name",
        "source.sass support.type.property-name",
        "source.scss support.type.property-name",
        "source.less support.type.property-name",
        "source.stylus support.type.property-name",
        "source.postcss support.type.property-name",
        "support.type.property-name.css",
        "support.type.vendored.property-name",
      ],
      settings: {
        foreground: functionPrimary,
      },
    },
    {
      name: "Sub-methods",
      scope: ["entity.name.module.js", "variable.import.parameter.js", "variable.other.class.js"],
      settings: {
        foreground: "#ff757f",
      },
    },
    {
      name: "Language methods",
      scope: ["variable.language"],
      settings: {
        foreground: "#ff757f",
      },
    },
    {
      name: "entity.name.method.js",
      scope: ["entity.name.method.js"],
      settings: {
        foreground: functionPrimary,
      },
    },
    {
      name: "meta.method.js",
      scope: ["meta.class-method.js entity.name.function.js", "variable.function.constructor"],
      settings: {
        foreground: functionPrimary,
      },
    },
    {
      name: "Attributes",
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "HTML Attributes",
      scope: ["text.html.basic entity.other.attribute-name.html", "text.html.basic entity.other.attribute-name"],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "HTML Doctype",
      scope: ["meta.tag.metadata.doctype entity.name.tag", "meta.tag.metadata.doctype entity.other.attribute-name"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "CSS Classes",
      scope: ["entity.other.attribute-name.class"],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "CSS ID's",
      scope: ["source.sass keyword.control"],
      settings: {
        foreground: functionPrimary,
      },
    },
    {
      name: "CSS psuedo selectors",
      scope: ["entity.other.attribute-name.pseudo-class", "entity.other.attribute-name.pseudo-element"],
      settings: {
        foreground: "#4fd6be",
      },
    },
    {
      name: "CSS Property value",
      scope: ["support.constant.property-value"],
      settings: {
        foreground: functionParameters,
      },
    },
    {
      name: "Inserted",
      scope: ["markup.inserted"],
      settings: {
        foreground: stringsPrimary,
      },
    },
    {
      name: "Deleted",
      scope: ["markup.deleted"],
      settings: {
        foreground: "#ff757f",
      },
    },
    {
      name: "Changed",
      scope: ["markup.changed"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "Regular Expressions",
      scope: ["string.regexp"],
      settings: {
        foreground: "#b4f9f8",
      },
    },
    {
      name: "Regular Expressions - Punctuation",
      scope: ["punctuation.definition.group"],
      settings: {
        foreground: "#ff757f",
      },
    },
    {
      name: "Regular Expressions - Character Class",
      scope: ["constant.other.character-class.regexp", "keyword.control.anchor.regexp"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "Regular Expressions - Character Class Set",
      scope: ["constant.other.character-class.set.regexp"],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "Regular Expressions - Quantifier",
      scope: ["keyword.operator.quantifier.regexp"],
      settings: {
        foreground: functionParameters,
      },
    },
    {
      name: "Escape Characters",
      scope: ["constant.character.escape"],
      settings: {
        foreground: punctuation,
      },
    },
    {
      name: "URL",
      scope: ["*url*", "*link*", "*uri*"],
      settings: {
        fontStyle: "underline",
      },
    },
    {
      name: "Decorators",
      scope: ["tag.decorator.js entity.name.tag.js", "tag.decorator.js punctuation.definition.tag.js"],
      settings: {
        foreground: functionPrimary,
      },
    },
    {
      name: "CSS Units",
      scope: ["keyword.other.unit"],
      settings: {
        foreground: "#fc7b7b",
      },
    },
    {
      name: "ES7 Bind Operator",
      scope: ["source.js constant.other.object.key.js string.unquoted.label.js"],
      settings: {
        foreground: "#ff757f",
      },
    },
    {
      name: "JSON Key - Level 0",
      scope: ["source.json meta.structure.dictionary.json support.type.property-name.json"],
      settings: {
        foreground: functionPrimary,
      },
    },
    {
      name: "JSON Key - Level 1",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: "#65bcff",
      },
    },
    {
      name: "JSON Key - Level 2",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: "#ff757f",
      },
    },
    {
      name: "JSON Key - Level 3",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: functionParameters,
      },
    },
    {
      name: "JSON Key - Level 4",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "JSON Key - Level 5",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: "#4fd6be",
      },
    },
    {
      name: "JSON Key - Level 6",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      ],
      settings: {
        foreground: functionPrimary,
      },
    },
    {
      name: "Plain Punctuation",
      scope: ["punctuation.definition.list_item.markdown"],
      settings: {
        foreground: "#828bb8",
      },
    },
    {
      name: "Block Punctuation",
      scope: [
        "meta.block",
        "meta.brace",
        "punctuation.definition.block",
        "punctuation.definition.parameters",
        "punctuation.section.function",
      ],
      settings: {
        foreground: "#b4c2f0",
      },
    },
    {
      name: "Markdown - Plain",
      scope: ["meta.jsx.children", "meta.embedded.block"],
      settings: {
        foreground: "#b4c2f0",
      },
    },
    {
      name: "Markdown - Markup Raw Inline",
      scope: ["text.html.markdown markup.inline.raw.markdown"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "Markdown - Markup Raw Inline Punctuation",
      scope: ["text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown"],
      settings: {
        foreground: punctuation,
      },
    },
    {
      name: "Markdown - Heading punctuation",
      scope: [
        "markdown.heading",
        "markup.heading | markup.heading entity.name",
        "markup.heading.markdown punctuation.definition.heading.markdown",
      ],
      settings: {
        foreground: punctuation,
      },
    },
    {
      name: "Markup - Italic",
      scope: ["markup.italic"],
      settings: {
        fontStyle: "italic",
        foreground: "#ff757f",
      },
    },
    {
      name: "Markup - Bold",
      scope: ["markup.bold", "markup.bold string"],
      settings: {
        fontStyle: "bold",
        foreground: "#ff757f",
      },
    },
    {
      name: "Markup - Bold-Italic",
      scope: [
        "markup.bold markup.italic",
        "markup.italic markup.bold",
        "markup.quote markup.bold",
        "markup.bold markup.italic string",
        "markup.italic markup.bold string",
        "markup.quote markup.bold string",
      ],
      settings: {
        fontStyle: "bold",
        foreground: "#ff757f",
      },
    },
    {
      name: "Markup - Underline",
      scope: ["markup.underline"],
      settings: {
        fontStyle: "underline",
        foreground: numberAndBoolean,
      },
    },
    {
      name: "Markdown - Blockquote",
      scope: ["markup.quote punctuation.definition.blockquote.markdown"],
      settings: {
        foreground: punctuation,
      },
    },
    {
      name: "Markup - Quote",
      scope: ["markup.quote"],
      settings: {
        fontStyle: "italic",
      },
    },
    {
      name: "Markdown - Link",
      scope: ["string.other.link.title.markdown"],
      settings: {
        foreground: functionPrimary,
      },
    },
    {
      name: "Markdown - Link Description",
      scope: ["string.other.link.description.title.markdown"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "Markdown - Link Anchor",
      scope: ["constant.other.reference.link.markdown"],
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      name: "Markup - Raw Block",
      scope: ["markup.raw.block"],
      settings: {
        foreground: keywordPrimary,
      },
    },
    {
      name: "Markdown - Fenced Bode Block Variable",
      scope: ["markup.fenced_code.block.markdown", "markup.inline.raw.string.markdown"],
      settings: {
        foreground: punctuation,
      },
    },
    {
      name: "Markdown - Fenced Language",
      scope: ["variable.language.fenced.markdown"],
      settings: {
        foreground: punctuation,
      },
    },
    {
      name: "Markdown - Separator",
      scope: ["meta.separator"],
      settings: {
        fontStyle: "bold",
        foreground: punctuation,
      },
    },
    {
      name: "Markup - Table",
      scope: ["markup.table"],
      settings: {
        foreground: "#828bb8",
      },
    },
    {
      scope: "token.info-token",
      settings: {
        foreground: "#65bcff",
      },
    },
    {
      scope: "token.warn-token",
      settings: {
        foreground: ClassDefinition,
      },
    },
    {
      scope: "token.error-token",
      settings: {
        foreground: "#ff757f",
      },
    },
    {
      scope: "token.debug-token",
      settings: {
        foreground: keywordPrimary,
      },
    },
  ],
}
