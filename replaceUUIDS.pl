#!/usr/bin/perl

use strict;
use warnings;
use Data::Dumper;

my $replaceHash = {
	"a" => "replacedA",
	"c" => "replacedC",
};

my $hashToFix = {
	"a" => "c",
	"bananas" => ["a", "apples", [1,2,"a"]],
	"c" => { "c" => ["c", {"a" => "f"}]},
	"d" => { "c" => "a"},
};

print "Before\n";
print Dumper($hashToFix);
fixUUIDs($hashToFix, $replaceHash);
print "After\n";
print Dumper($hashToFix);





sub fixUUIDs{
	my ($object, $replaceHash) = @_;
	my @oldKeys = keys %$replaceHash;
    if(ref $object eq 'HASH'){
        my @keys = keys %$object;
        foreach my $key (@keys){
        	my $newKey = $replaceHash->{$key};
        	my $value = $object->{$key};
        	
        	# Replace all old uuids in hash keys 
        	if($newKey){	# If the old key has an entry in the replace hash that means it's an old UUID
        		$object->{$newKey} = $value;
        		delete $object->{$key};
        	}
        	
        	# This is the actual hash key we are using at this point (old or new)
        	my $keyUsed = $newKey ? $newKey : $key;
        	
        	# If the value is a reference, continue traversing
        	if(ref $value){
        		fixUUIDs($value, $replaceHash);	
        	}else{ # Otherwise it might be an old UUID, replace it
        		my $newValue = $replaceHash->{$value};
        		# If the old value has an entry in the replace hash that means it's an old UUID
        		$object->{$keyUsed} = $newValue if ($newValue);
        	}
			
        }
    }elsif (ref $object eq 'ARRAY'){
        foreach my $index (0..$#{$object}){
        	my $value = $object->[$index];
        	# If the value is a reference, continue traversing
        	if(ref $value){
        		fixUUIDs($value, $replaceHash);	
        	}else{ # Otherwise it might be an old UUID, replace it
        		my $newValue = $replaceHash->{$value};
        		# If the old value has an entry in the replace hash that means it's an old UUID
        		$object->[$index] = $newValue if ($newValue);
        	}
        }
    }
}