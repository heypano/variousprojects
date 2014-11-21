#!/usr/bin/perl

use strict;
use feature "switch";

use Data::Dumper;

$Data::Dumper::Sortkeys = 1;  

BEGIN {
    for my $module ( qw/XML::Compile::Schema XML::LibXML::Reader/ ) {

        if( eval "require $module" ) {
            eval "import $module";
        } else {
            print "You do not have $module installed\n";
            print "Install by running the following command:\n";
            print "  sudo perl -MCPAN -e 'install $module'\n";
            exit(1);
        }
    }
}

if( @ARGV < 2 || ($ARGV[0] =~ 'xml' && @ARGV != 5) || ($ARGV[0] eq 'template' && @ARGV != 4) ) {
	print <<EOF;
xsd.pl is a tool to analyze XSD files, validate perl structures against XSD, 
and convert perl structures to XML.
------------------------------------------------------------------------------
Validate and convert a perl structure to XML:
  xsd.pl to-xml <xsd file> <namespace> <element name> <perl file>
  
Convert a XML file to a perl structure:  
  xsd.pl from-xml <xsd file> <namespace> <element name> <xml file>
  
Print all types in the XSD
  xsd.pl index <xsd file>
  
Print an expected perl data structure from the XSD
  xsd.pl template <xsd file> <namespace> <element name>
------------------------------------------------------------------------------
Examples:  
  xsd.pl to-xml network.xsd com.cisco networkObject network.perl
  
  xsd.pl from-xml network.xsd com.cisco networkObject network.xml
  
  xsd.pl index network.xsd
  
  xsd.pl template network.xsd com.cisco networkObject
EOF
	exit(0);
}


my $mode = shift @ARGV;
my $xsd = shift @ARGV;
my $namespace = shift @ARGV;
my $element = shift @ARGV;
my $file = shift @ARGV;

$mode //= 'to-xml';  # if no mode is specified, assume $file is a perl object that was printed using Data::Dumper (with $Data::Dumper::Terse = 1 set)

my $schema = XML::Compile::Schema->new([$xsd, 'common-deploy.xsd']);

if( !-e $xsd ) {
	print "Cannot find $xsd\n";
}

if( !-e $file ) {
	print "Cannot find $file\n";
}


# an example perl object file looks like:
# {
#        'key1' => 'value1',
#        'key2' => 'value2'
# }

given( $mode ) {
	when('to-xml') {
		open FILE, "<$file";
		my $data;
		{
			local $/;
			$data = eval <FILE>;
		}
		close FILE;
		
		my $doc = XML::LibXML::Document->new('1.0', 'UTF-8');
		my $write = $schema->compile(WRITER => "\{$namespace\}$element");
		my $xml = $write->($doc, $data);
		
		$doc->setDocumentElement($xml);
		my $xmltxt = $doc->toString(1);
		
		print $xmltxt . "\n";
	}
	when('from-xml') {
		open FILE, "<$file";
		my $xmltxt;
		{
			local $/;
			$xmltxt = <FILE>;
		}
		close FILE;
		print $xmltxt . "\n";
		my $read = $schema->compile(READER => "\{$namespace\}$element");
		my $hash = $read->($xmltxt);

		print Dumper($hash);
	}
	when('index') {
		$schema->printIndex();		
	}
	when('template') {
		warn $schema->template('PERL', "\{$namespace\}$element");
	}
}