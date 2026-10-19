<?php
// Links the repository as `demo/themes/leon`, so the demo site uses the theme under development,
// and installs the component themes (FlexSearch, Dark mode toggle and Pele) in `demo/themes/`:
// linked from a sibling clone (e.g. `../theme-flexsearch`) if it exists, cloned from GitHub otherwise.
$themes = __DIR__ . DIRECTORY_SEPARATOR . 'themes';
@mkdir($themes, 0777, true);
$code = 0;

function link_dir(string $target, string $link): int
{
    if (PHP_OS_FAMILY === 'Windows') {
        exec(sprintf('mklink /J %s %s', escapeshellarg($link), escapeshellarg($target)), $output, $code);

        return $code;
    }

    return symlink($target, $link) ? 0 : 1;
}

$repository = dirname(__DIR__);
$link = $themes . DIRECTORY_SEPARATOR . 'leon';
if (file_exists($link)) {
    echo "Link already exists: $link\n";
} else {
    $code = link_dir(PHP_OS_FAMILY === 'Windows' ? $repository : '../..', $link);
    echo $code === 0 ? "Linked $link -> $repository\n" : "Unable to create $link\n";
}

foreach (['flexsearch', 'darkmodetoggle', 'pele'] as $name) {
    $path = $themes . DIRECTORY_SEPARATOR . $name;
    if (file_exists($path)) {
        echo "Theme already installed: $path\n";
        continue;
    }
    $sibling = dirname($repository) . DIRECTORY_SEPARATOR . "theme-$name";
    if (is_dir($sibling)) {
        $result = link_dir($sibling, $path);
        echo $result === 0 ? "Linked $path -> $sibling\n" : "Unable to link $path\n";
    } else {
        passthru(sprintf('git clone --quiet --depth 1 https://github.com/Cecilapp/theme-%s.git %s', $name, escapeshellarg($path)), $result);
        echo $result === 0 ? "Installed $path\n" : "Unable to install $path\n";
    }
    $code = $code ?: $result;
}

exit($code);
