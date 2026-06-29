# PR: maint: update Rust bindings to tree-sitter 0.25 API

**From:** brandon-arrendondo/tree-sitter-fixed-form-fortran:master
**Into:** stadelmanma/tree-sitter-fixed-form-fortran:master

## Command

```
gh pr create \
  --repo stadelmanma/tree-sitter-fixed-form-fortran \
  --head brandon-arrendondo:master \
  --base master \
  --title "maint: update Rust bindings to tree-sitter 0.25 API" \
  --body "$(cat <<'EOF'
## Summary

- **`Cargo.toml`**: version `0.0.1` → `0.1.0`, edition `2018` → `2021`, replace `tree-sitter = "~0.20.3"` with `tree-sitter-language = "0.1"` (the modern split crate required by tree-sitter ≥ 0.24)
- **`bindings/rust/build.rs`**: enable `scanner.c` compilation (was commented out), remove dead C++ scanner template
- **`bindings/rust/lib.rs`**: replace deprecated `language() -> Language` function with `pub const LANGUAGE: LanguageFn` using `LanguageFn::from_raw`
- **`src/scanner.c`** *(new)*: derived from `stadelmanma/tree-sitter-fortran@7edacd2` with `tree_sitter_fortran_*` symbols renamed to `tree_sitter_fixed_form_fortran_*`
- **`src/tree_sitter/alloc.h`**, **`array.h`** *(new)*: bundled headers required by `scanner.c` at build time, from the same source

No grammar changes. `src/parser.c` is also re-derived from `stadelmanma/tree-sitter-fortran@7edacd2` (same rename) to match the 0.25 ABI expected by the updated headers.

## Motivation

We use this grammar in [knots](https://github.com/brandon-arrendondo/knots) to parse fixed-form Fortran (`.f`, `.for`, `.f77`). The tree-sitter ecosystem has moved to the `tree-sitter-language` split crate and the `LanguageFn` API; without this update the crate cannot be compiled against tree-sitter ≥ 0.24 and cannot be published to crates.io for use as a registry dependency.

## Test plan

- [ ] `cargo build` succeeds
- [ ] `cargo test` passes (`test_can_load_grammar`)
EOF
)"
```
