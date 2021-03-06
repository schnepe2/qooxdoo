# Theming

Qooxdoo includes four themes:

- `Simple` - a lightweight theme, which looks more like a website.
- `TangibleLight` and `TangibleDark` - lightweight themes based on Google Materials design philosophy and using Material Font Icons
- `Modern` - a graphically rich theme, showcasing many UI capabilities of
  Qooxdoo %{version}
- `Classic` - MS Windows oriented theme
- `Indigo` - a theme, based on simple but offers the style of the qooxdoo.org
  website.

Here some screenshots:

![Simple theme](theming/window_simple_theme.png)

![Tangible Light theme](theming/window_tangible_light_theme.png)

![Tangible Dark theme](theming/window_tangible_dark_theme.png)

![Modern theme](theming/window_modern_theme.png)

![Classic theme](theming/window_classic_theme.png)

![Indigo theme](theming/window_indigo_theme.png)

While those four themes run out-of-the-box, it is easy to create your own
themes. Those custom themes can either be created by extending existing ones
desktop/ui_custom_themes.md#extending_themes or they can be created from scratch
desktop/ui_custom_themes.md#custom_themes.

A complete theme (a so-called _meta theme_) consists of several special themes,
each designed to play a dedicated role and to setup the different parts of the
whole theming. These special themes are described at the subsequent sections
followed by a description of how to create own themes.

## Meta Theme

A meta theme describes the whole theme itself by defining the specific parts.
Each meta theme consists of five keys

- appearance
- color
- decoration
- font
- icon

each of them referencing to a specialized theme. So you can think of a meta
theme as of collection whose parts can easily be changed.

Sample of a meta theme:

```javascript
qx.Theme.define("qx.theme.Modern",
{
  meta :
  {
    color : qx.theme.modern.Color,
    decoration : qx.theme.modern.Decoration,
    font : qx.theme.modern.Font,
    appearance : qx.theme.modern.Appearance,
    icon : qx.theme.icon.Tango
  }
}
```

This section describes the different types of themes which are used for theming
a whole application.

## Color Theme

A color theme defines all colors used by the framework. Each color is defined by
an unique name and a value which can be written as hex, rgb or named color. This
defined name is usable throughout the whole framework and your application.

> :memo: The best way to organize your color names is to use **semantic ones** like
> `background`, `text-input` or `text-disabled`. This way it is easier to use
> one color for multiple widgets.

Part of a sample color theme:

```javascript
/**
 * sample color theme
 */
qx.Theme.define("myApplication.theme.sample.Color",
{
  colors :
  {
    /*
    ----------------------------------------------------------------------
      SAMPLE COLORS
    ----------------------------------------------------------------------
    */

    // color as hex value
    "background-application" : "#DFDFDF",

    // color as rgb array
    "background-pane" : [ 128, 128, 128 ],

    // color as named color
    "background-light" : "gray",
  }
});
```

Following names are recognized as named colors: `black`, `white`, `silver`,
`gray`, `maroon`, `red`, `purple`, `fuchsia`, `green`, `lime` , `olive`,
`yellow`, `navy`, `blue`, `teal`, `aqua`, `orange`, `brown` .

The color values are set in the class
[qx.util.ColorUtil](apps://apiviewer/#qx.util.ColorUtil)

## Decoration Theme

Each widget can be equipped with an independent decoration which can be used to
set a background-color or -image, define a border, add a shadow and much more.
In a decoration theme you can use several different decorators depending on the
results you wish to achieve. Please take a look at the decorator article
(ui_decorators) to get more information.

> :memo: It is recommended to define the decorations inside the theme instead of
> creating manually decorator instances inside your application code. This way
> the created decorators can be used by multiple widgets.

What a decoration theme can look like:

```javascript
/**
 * Sample decoration theme.
 *
 * @asset(sample/decoration/myDecorationTheme/*)
 */
qx.Theme.define("myApplication.theme.sample.Decoration",
{
  aliases : {
    decoration : "myApplication/decoration/sample"
  },

  decorations :
  {
    "single" :
    {
      decorator: qx.ui.decoration.Single,

      style :
      {
        width : 1,

        color : "red",
        colorLeft : "black",
        colorRight : "white",

        style : "solid"
      }
    },

    "grid" :
    {
      decorator : qx.ui.decoration.Grid,

      style :
      {
        baseImage : "decoration/pane/grid.png"
      }
    },


    "combined" :
    {
      decorator : [
        qx.ui.decoration.MBackgroundColor,
        qx.ui.decoration.MBorderRadius
      ],

      style :
      {
        backgroundColor : "button",
        radius : 3
      }
    }
});
```

Noted the `@asset` at the top and the `aliases` key inside the theme
declaration? This is needed to for the images used within the theme. A
description of how to work with resources is available here
ui_resources.md#declaring_resources_in_the_code.

> :memo: The `aliases` key is especially important when defining an own decorator
> theme. This entry does add a new alias at the `AliasManager` class and
> verifies that your images for the decoration theme are found by the
> `ResourceManager` which is working with the resolve URLs of the `AliasManager`
> class.

## Font Theme

This theme is all about the information of the fonts used throughout your
application. As the number of types/variants of fonts used with application
isn't that big the font theme is normally a compact one. Web fonts are also
defined here. See the article on web fontsui_webfonts.md#webfonts for details.

> :memo: It is always a good idea to limit the number of types or variants of fonts to
> create a homogenous look.

To demonstrate how compact and powerful a font theme can look like, take a look
at the example font theme:

```javascript
/**
 * The modern font theme.
 */
qx.Theme.define("qx.theme.modern.Font",
{
  fonts :
  {
    "default" :
    {
      size : 11,
      lineHeight : 1.4,
      family : [ "Tahoma", "Liberation Sans", "Arial" ]
    },

    "bold" :
    {
      size : 12,
      lineHeight : 1.4,
      family : [ "Lucida Grande" ],
      bold : true
    }
  }
});
```

It is important to note that you can only specify values available as property
on [qx.bom.Font](apps://apiviewer/#qx.bom.Font) or  
[qx.bom.webfonts.WebFont](apps://apiviewer/#qx.bom.webfonts.WebFont).

### Web Fonts

These days there are a lot of fonts available, and it's not unusual to want to download and use a font specifically chosen for your theme.  These webfonts are available from a variety of sources (whether open source licensed or proprietary / paid for); you can use an online service such as (FontSquirrel's Webfont Generator)[https://www.fontsquirrel.com/tools/webfont-generator] or other tools to convert your fonts into webfonts (provided of course that your license for the font permits it) and add them to your resources directory, and then add them to your theme font by using the `sources` option.  

This example uses the (Monserrat font)[https://fonts.google.com/specimen/Montserrat]

```
    "default": {
      size: 14,
      family: ["Montserrat", "sans-serif"],
      color: "text-primary-on-surface",
      weight: "300",
      sources: [
        {
          family: "Montserrat",
          fontWeight: "300",
          source: [
            "grasshopper/font/Montserrat/Montserrat-Light.woff2",
            "grasshopper/font/Montserrat/Montserrat-Light.woff",
            "grasshopper/font/Montserrat/Montserrat-Light.ttf"
          ]
        }
      ]
    },
    
    "bold":
    {
      size: 14,
      family: ["Montserrat", "sans-serif"],
      bold: true,
      color: "text-primary-on-surface",
      weight: "500",
      sources: [
        {
          family: "Montserrat",
          fontWeight: "500",
          source: [
            "grasshopper/font/Montserrat/Montserrat-Medium.eot",
            "grasshopper/font/Montserrat/Montserrat-Medium.woff2",
            "grasshopper/font/Montserrat/Montserrat-Medium.woff",
            "grasshopper/font/Montserrat/Montserrat-Medium.ttf"
          ]
        }
      ]
    },
    
    "italic": {
      size: 14,
      family: ["Montserrat", "sans-serif"],
      color: "text-primary-on-surface",
      italic: true,
      weight: "300",
      sources: [
        {
          family: "Montserrat",
          fontWeight: "300",
          fontStyle: "italic",
          source: [
            "grasshopper/font/Montserrat/Montserrat-LightItalic.eot",
            "grasshopper/font/Montserrat/Montserrat-LightItalic.woff2",
            "grasshopper/font/Montserrat/Montserrat-LightItalic.woff",
            "grasshopper/font/Montserrat/Montserrat-LightItalic.ttf"
          ]
        }
      ]
    },
```

Note that things like "family" are specified more than once and in different ways - the *top* level of properties (eg `size`, `family`, `bold`, etc relate to properties in the [qx.bom.webfonts.WebFont](apps://apiviewer/#qx.bom.webfonts.WebFont) class, whereas the properties of the `sources` key are slightly different.

The top level properties are typically for defining what properties you would allow the browser to apply, and are analogous to the CSS properties.  For example, you can see that `family` is an array, because just like CSS the browser is to try and the first listed font family and then fallback to the second etc.

The `sources` property, tells Qooxdoo where to load the fonts from and what font variants are in the font files; the `family` property in this section is not an array - it is the actual family of the font contained in the file.  

When looking at all the fonts in your theme, Qooxdoo will only load a font file once - however, due to restrictions on how a browser allows us to detect when a font is loaded, the way it does this is to create a unique key based on `sources.family`, `sources.fontWeight`, and `sources.fontStyle`.  The net effect is that if you use more than one font from the same family, then you *must* make sure that the `sources` key describes `fontWeight` and `fontStyle` and that the addition of `fontWeight` and `fontStyle` make a unique key.

Note also the top level `weight`, `bold`, and `italic` properties - these do not need to match whatever is provided by the font file - for example, you could use a regular, non-italic font for the "italic" font; Qooxdoo and the browser won't care that the font does not appear italic on the screen.

One other thing to note is the top level `weight` property - the default browser font weight is 400, and if your font is not 400 in weight then you must specify the actual weight at the top level.


## Icon Theme

This theme is to define which icon set is used and normally consists only of 2
main keys (title and aliases).

The important one is the `aliases` key which points the compiler to the
location of the icon set. The `icon` alias, which is used to reference icons
in Qooxdoo applications, is set to the value of this key. As Qooxdoo uses the
freely available [Tango](https://commons.wikimedia.org/wiki/Tango_icons) and
[Oxygen](http://www.iconarchive.com/show/oxygen-icons-by-oxygen-icons.org.html)
icon sets it is not necessary to extend these.

Complete code for the `tango` icon theme:

```javascript
/**
 * Tango icons
 */
qx.Theme.define("qx.theme.icon.Tango",
{
  aliases : {
    "icon" : "qx/icon/Tango"
  }
});
```

## Appearance Theme

The appearance theme is by far the biggest theme. Its task is to describe every
themable widget and their child controls. Since the widgets are styled using
decorators, colors, fonts and icons the appearance theme uses the definitions of
all the other themes namely the decoration, color, font and icon theme. You can
think of the appearance theme as the central meeting point where the other
themes (decorator, color, font and icon) get together.

To discover the power of the appearance theme please take a look at the
[corresponding article](appearance.md) which should let you get an idea of the
whole picture.

## Applying Themes

Typically, your application will have a certain, pre-defined theme known _at
build-time_. The best way to associate such a default outlook with your
application is to use the config.json variable `QXTHEME` inside the "let"
section. Setting this variable to a fully-qualified meta theme class lets the
build process handle the proper inclusion and linkage of the theme classes
automatically. E.g.:

```
...
QXTHEME : qx.theme.Modern,
...
```

## Switching Themes During Runtime

It is also possible to set a theme _at runtime_:

```javascript
qx.theme.manager.Meta.getInstance().setTheme(qx.theme.Classic);
```

Having e.g. the Qooxdoo modern theme defined in your config.json file, this line
of code switches the whole UI to the classic theme. Of course, this can also be
a custom theme desktop/ui_custom_themes.md#custom_themes.

> :memo: Referencing a second theme in the code also adds a dependency to the theme and
> all the classes and resources necessary. This is only necessary if the theme
> switch is actively triggered. Parts
> parts_overview.md#parts_and_packages_overview offer a convenient way of on
> demand loading of code, like a second theme.

## Multi-theme Applications

Building up on the previous section, here is how to create an application that
provides multiple themes that can be switched at runtime.

- **Configure themes**: Add all meta theme classes of the themes you want to use
  to the `include` key for the application; for example:
  
```
   "applications": [
      {
         "class": "qxl.widgetbrowser.Application",
         "theme": "qx.theme.Indigo",
         "name": "widgetbrowser",
         "title": "WidgetBrowser",
         "include": [
            "qx.theme.Modern",
            "qx.theme.Simple",
            "qx.theme.Classic",
            "qx.theme.TangibleLight",
            "qx.theme.TangibleDark",
```

  If you use third-party themes (like the Aristo or RetroTheme contributions)
  make sure you also add their libraries via `qx package` or the `libraries` property in the `compile.json`, so their classes are actually available.

- **Implement theme switch**: Switch the theme in your application code. E.g.
  you can use [qx.Theme.getAll()](apps://apiviewer/#qx.Theme~getAll) to retrieve
  all known theme classes, filter out the "meta" classes, decide which to use,
  and set it as the current theme, exemplified here through two methods:

  ```javascript
  _getThemeNames : function() {
    var theme, theme_names = [];
    var themes = qx.Theme.getAll();
    for (var key in themes) {
      theme = themes[key];
      if (theme.type === "meta") {
        theme_names.push(theme.name); }
    }
    return theme_names;
  }

  _setTheme : function(theme_name) {
    var theme = qx.Theme.getByName(theme_name);
    if (theme) {
      qx.theme.manager.Meta.getInstance().setTheme(theme); }
  }
  ```

  Of course you can use these APIs in different ways, depending on your
  application needs.

- **Use theme-dependent icons (opt)**: So far switching the theme will result in
  widgets changing their appearance. Usually, themes also use a specific icon
  theme. If you use icons in your custom classes (widgets or themes), and you
  want them to adapt to the main theme you need to make sure that

  1.  the relevant icons of all icon themes are registered with your application
  2.  your code doesn't "hard-wire" icons but uses aliases. Here are code
      snippets to illustrate that.

  For 1. add macro definitions to your config.json which can later be used in
  the @asset development/api_jsdoc_ref.md#asset hints of class code. E.g.:

  ```json5
  // config.json :

  "let" : {
    "QXICONTHEME" : ["Tango", "Oxygen"]
  }
  ```

  In application code register icons for both icon themes with the class using
  them, by exploiting an asset macro instead of entering the icon theme
  literally. This also allows you to later add further icon themes just by
  adapting the configuration, without touching code:

  ```javascript
  // Application class:

  // Use the asset macro "qx.icontheme" to register icons from both themes.
  /**
   * @asset(myapp/icontheme/${qx.icontheme}/16/apps/utilities-terminal.png)
   */
  ```

  For 2. use an alias in application code to reference icons transparently:

  ```javascript
  // Use an aliased resource id for the icon
  var b = qx.ui.form.Button("My button", "icon/16/apps/utilities-terminal.png");
  ```

