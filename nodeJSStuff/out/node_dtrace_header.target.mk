# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := node_dtrace_header
### Rules for final target.
$(obj).target/node_dtrace_header.stamp: TOOLSET := $(TOOLSET)
$(obj).target/node_dtrace_header.stamp:  FORCE_DO_CMD
	$(call do_cmd,touch)

all_deps += $(obj).target/node_dtrace_header.stamp
# Add target alias
.PHONY: node_dtrace_header
node_dtrace_header: $(obj).target/node_dtrace_header.stamp

# Add target alias to "all" target.
.PHONY: all
all: node_dtrace_header

