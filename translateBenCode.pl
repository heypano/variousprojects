#!/usr/bin/perl

use strict;
use warnings;

my $string = "|[] \\[ `[ . [`] [\\ [\\] [] . `] ]\\ . |[ \\[ `[ [| . ]|[ ][ [| [\] . ][ [| ]\\ . [\ [\] |][ ]| ]`[ ¤";
#$string = ']`[ [\ [\] [] . ]`[ [\ ]`[ [\ []| [\ `[ [] ]\\';
my @from = qw/[\\ |[] |[ ]`[ [\\] [] [`] []| `[ ]\\ `] \[ [|/;
my @to =   qw/A B C Y N O P D T S I U E/;

for (0..$#from){
	my $f = $from[$_];
	my $t = $to[$_];
	$string =~ s/ ?\Q$f\E / $t /g;
}
$string =~ s/ //g;
$string =~ s/\./ /g;
print "$string\n";